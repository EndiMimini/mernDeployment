import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../AuthContext';

const Dashboard = (props) => {
  const { logout } = useAuth();
    const [polls, setPolls] = useState([])
    const [top3, setTop3] = useState([])
    const userId = localStorage.getItem('userId');

    useEffect(()=>{
    	axios.get("http://localhost:8000/api/polls",   { 
        withCredentials: true
      })
    	.then((res)=>{
	    console.log(res.data);
            setPolls(res.data.polls);
	})
    	.catch((err)=>{
            console.log(err);
    	})

      axios.get("http://localhost:8000/api/polls/top3",   { 
        withCredentials: true
      })
    	.then((res)=>{
	    console.log(res.data);
            setTop3(res.data.polls);
	})
    	.catch((err)=>{
            console.log(err);
    	})


    }, [])

    const handleLogout = async (e) => {
      e.preventDefault();

      try {
          // Call the logout function from the AuthContext
          await logout();
          navigate('/')
          // Redirect or perform any other actions after successful registration
      } catch (error) {
          // Handle registration error
      }
  };
    return(
       <>
       <nav className="d-flex justify-content-end">
       <Link className=" btn btn-outline-primary customColor" to={'/polls/new'}>Create a new poll</Link>
       <button onClick={handleLogout}>Logout</button>
       </nav>
       
        <div className="row">
          <div className="col-lg-6">
          {
       
       top3.length > 0?
          top3.map((post, index)=>{
                return (

                    <div key={index} className="card">
                    <div className="card-body">
                    <Link className="card-title" to={`/polls/${post._id}`}>{post.question}</Link>


                      <h6 className="card-subtitle mb-2 text-muted"></h6>
                      <p className="card-text">{post.option1}: {post.option1Votes}</p>
                      <p className="card-text">{post.option2}: {post.option2Votes}</p>
                      { 
                      post.option3 != ''?<p className="card-text">{post.option3}: {post.option3Votes}</p>: null
                      }
                      {
                      post.option4 != ''?<p className="card-text">{post.option4}: {post.option4Votes}</p>: null


                      }
                      <p>{moment(post.createdAt).fromNow()}</p>
                      {
                        userId == post.userId?
                        <Link className="card-title" to={`/polls/edit/${post._id}`}>Edit</Link>:
                        null

                      }

                     
                    </div>
                  </div>
               
                )
                })
                :
                <div className="w-100">
                  <div className="card text-center w-100">
                    <div className="card-header">
                      There are no questions yet!
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Feeling inspired?</h5>
                      <p className="card-text">Go ahead and</p>
                      <Link to={'/polls/new'}>Create a new poll</Link>
                    </div>
                    
                  </div>
                </div>

               

              }
          </div>
          <div className="col-lg-6">
          {
       
       polls.length > 0?
       polls.map((post, index)=>{
                return (

                    <div key={index} className="card">
                    <div className="card-body">
                    <Link className="card-title" to={`/polls/${post._id}`}>{post.question}</Link>

                      <h6 className="card-subtitle mb-2 text-muted"></h6>
                      <p className="card-text">{post.option1}: {post.option1Votes}</p>
                      <p className="card-text">{post.option2}: {post.option2Votes}</p>
                      { 
                      post.option3 != ''?<p className="card-text">{post.option3}: {post.option3Votes}</p>: null
                      }
                      {
                      post.option4 != ''?<p className="card-text">{post.option4}: {post.option4Votes}</p>: null

                      }
                      {
                        userId == post.userId?
                        <Link className="card-title" to={`/polls/edit/${post._id}`}>Edit</Link>:
                        null

                      }
                    </div>
                  </div>
               
                )
                })
                :
                <div className="w-100">
                  <div className="card text-center w-100">
                    <div className="card-header">
                      There are no questions yet!
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Feeling inspired?</h5>
                      <p className="card-text">Go ahead and</p>
                      <Link to={'/polls/new'}>Create a new poll</Link>
                    </div>
                    
                  </div>
                </div>

               

              }
          </div>

       
            </div>
              
            </>
    )
}
export default Dashboard;