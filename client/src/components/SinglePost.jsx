import React, {useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import axios from 'axios'
import '../App.css'
const SinglePost = (props) => {
    const [post, setPost] = useState([{}])
    const [text,setText]= useState("")
    const [rating,setRating]= useState()
    const [reviews, setReviews] = useState([{}])
    const [errorMessage, setErrorMessage] = useState("")
    const {id} = useParams() 
    const navigate = useNavigate()
    const navigateBack = () => {
        navigate(-1)
    }
    useEffect(()=>{
        
        
    	axios.get(`http://localhost:8000/api/post/${id}`)
    	.then((res)=>{
	        console.log(res.data);
            setPost(res.data.post);
            setReviews(res.data.post.reviews)
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])

    const addReview = (e) => {
        e.preventDefault()
        if (text.length <3 || rating>5){
            setErrorMessage('Your form has some unsolved issues!')
        }
        else{
            
            axios.patch(`http://localhost:8000/api/post/review/${id}`, {
                text,    // this is shortcut syntax for firstName: firstName,
                rating
            })
                .then(res=>{
                    
                    navigate('/')
                })
                .catch(err=>{
                    setErrorMessage("Your api has some problems!")
                    console.log(err)})
        }
    }

    const deletePost = () => {
        axios.delete(`http://localhost:8000/api/post/${id}`)
        .then((res)=>{
            console.log(res)
            navigate('/')
        })
        .catch((err)=>{
            console.log(err);
    	})
    }
    return(
       <>
        <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>

       <div className=" row" >
        <div className="col-lg-8 col-md-8 col-sm-12">
            <h2 className="text-center">{post.title}</h2>
            <p  className="text-center">{post.content}</p>
            <div className="d-flex align-items-center justify-content-center">
                <Link className="mx-2 btn btn-outline-warning" to={`/post/edit/${post._id}`}>Edit</Link>
                <button className="mx-2 btn btn-outline-danger" onClick={deletePost}>Delete</button>
            </div>
            <h5 className="text-center mt-2 border-top">Read what others say about {post.title}</h5>
            {
            reviews.length > 0?
               reviews.map((review, index)=>{
               return (

                   <div key={index} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{review.text}</h5>
                            <h6 className="card-subtitle mb-2 text-muted"></h6>
                            <p className="card-text">Rating: {review.rating}</p>                    
                        </div>
                    </div>
              
               )
            
             }):
             <p className="text-center">There are no reviews yet!</p>
             }
            





        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
        <form className="w-75 m-auto" onSubmit={(e)=>addReview(e)}>
            <h4 className="text-center">Add a review for this destination</h4>
                <div>
                    <label className="form-label">Review Description: </label>
                    <textarea className="form-control" type="text" onChange={(e)=>setText(e.target.value)} />
                </div>
                { text.length >0 && text.length <3?
                <p className="text-danger">The review should be 2 characters or more</p>:
                null
                }
                <div>
                    <label className="form-label">Rating: </label>
                    <input className="form-control" type="number" step={0.1} onChange={(e)=>setRating(e.target.value)}  placeholder="Rate this destination from 0-5"/>
                </div>
                { rating >5?
                <p className="text-danger">The review can be from 1-5</p>: 
                null
                }
                
            
                
                <button className="btn btn-outline-primary customColor mt-2">Add a review</button>
                
            </form>
        </div>
        
       
        
        
       </div>

      
       </>
    )
}
export default SinglePost;