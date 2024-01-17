import React, {useState, useEffect} from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios'

const EditPost = (props) => {
    const navigate = useNavigate()

    const [question, setQuestion] = useState("");
    const [questionCreatorId, setQuestionCreatorId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {id} = useParams() 
    const userId = localStorage.getItem('userId');
    const navigateBack = () => {
        navigate(-1)
    }

    useEffect(()=>{
        
    	axios.get(`http://localhost:8000/api/poll/${id}`, {withCredentials: true})
    	.then((res)=>{
	        console.log(res.data);
            setQuestion(res.data.poll.question)
            setQuestionCreatorId(res.data.poll.userId)
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])


    const updatePost = (e) => {
        //prevent default behavior of the submit
        e.preventDefault();
        if (question.length <2){
            setErrorMessage('Your form has some unsolved issues!')
        }
        else{
            if (userId == questionCreatorId){
                axios.patch(`http://localhost:8000/api/poll/${id}`, {
                    question
                },{
                    withCredentials: true
                })
                    .then(res=>{
                        navigate('/')
                    })
                    .catch(err=>{
                        setErrorMessage("Your api has some problems!")
                        console.log(err)})
            }
            else{
                setErrorMessage('You are not the creator, cant update')
            }
            }
            
            
    }

  
    return(
        <div className="px-3">
            <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>
            <h1 className="text-center p-2">Update question</h1>
            {
                errorMessage?
                <p className="text-danger text-center">{errorMessage}</p>:
                null
            }

            <form className="w-75 m-auto" onSubmit={(e)=>updatePost(e)}>
                <div>
                    <label className="form-label">Question: </label>
                    <input className="form-control" type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}  placeholder="Enter the question"/>
                </div>
                { question.length >0 && question.length <3?
                <p className="text-danger">The question should be 2 characters or more</p>:
                null
                }
                
                <button className="btn btn-outline-primary customColor mt-2">Edit question</button>
                
            </form>

            
        </div>
    )
}
export default EditPost;