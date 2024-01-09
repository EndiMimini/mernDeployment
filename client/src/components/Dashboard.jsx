import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import moment from 'moment'
const Dashboard = (props) => {

    const [polls, setPolls] = useState([])
    const [top3, setTop3] = useState([])

    useEffect(()=>{
    	axios.get("http://localhost:8000/api/polls")
    	.then((res)=>{
	    console.log(res.data);
            setPolls(res.data.polls);
	})
    	.catch((err)=>{
            console.log(err);
    	})

      axios.get("http://localhost:8000/api/polls/top3")
    	.then((res)=>{
	    console.log(res.data);
            setTop3(res.data.polls);
	})
    	.catch((err)=>{
            console.log(err);
    	})


    }, [])

    return(
       <>
       <nav className="d-flex justify-content-end">
       <Link className=" btn btn-outline-primary customColor" to={'/polls/new'}>Create a new poll</Link>
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