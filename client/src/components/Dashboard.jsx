import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
const Dashboard = (props) => {

    const [posts, setPosts] = useState([])
    useEffect(()=>{
    	axios.get("http://localhost:8000/api/posts")
    	.then((res)=>{
	    console.log(res.data);
            setPosts(res.data.posts);
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])

    return(
       <>
       <nav className="d-flex justify-content-end">
       <Link className=" btn btn-outline-primary customColor" to={'/post/create'}>Create a new post</Link>
       </nav>
       
        <div className="d-flex justify-content-evenly">
        {
       
        posts.length > 0?
                posts.map((post, index)=>{
                return (

                    <div key={index} className="card">
                    <img src={post.imageUrl} className="card-img-top customImageWidth" alt={post.title}/>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted"></h6>
                      <p className="card-text">{post.content}</p>
                      <Link to={`/post/${post._id}`}>View more details</Link>
                     
                    </div>
                  </div>
               
                )
                })
                :
                <div className="w-100">
                  <div className="card text-center w-100">
                    <div className="card-header">
                      There are no posts yet!
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Feeling inspired?</h5>
                      <p className="card-text">Go ahead and</p>
                      <Link to={'/post/create'}>Create a new post</Link>
                    </div>
                    
                  </div>
                </div>

               

              }
            </div>
              
            </>
    )
}
export default Dashboard;