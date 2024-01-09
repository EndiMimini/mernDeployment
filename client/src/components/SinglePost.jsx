import React, {useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import axios from 'axios'
import '../App.css'
const SinglePost = (props) => {
    const [hasVoted, setHasVoted] = useState(false)

    const [poll, setPoll] = useState([{}])
    const {id} = useParams() 
    const navigate = useNavigate()
    const navigateBack = () => {
        navigate(-1)
    }
    useEffect(()=>{
    	axios.get(`http://localhost:8000/api/poll/${id}`)
    	.then((res)=>{
            setPoll(res.data.poll);
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])

    const handleVote1 = (e) => {
        e.preventDefault()
        let pollToUpdate = {...poll}
        pollToUpdate.option1Votes += 1
        pollToUpdate.votesCount += 1
        
        axios.put(`http://localhost:8000/api/poll/${id}`, 
                pollToUpdate
            )
                .then(res=>{
                    setHasVoted(true)
                    setPoll(res.data.poll)
                })
                .catch(err=>{
                    setErrorMessage("Your api has some problems!")
                    console.log(err)})
        }

        const handleVote2 = (e) => {
            e.preventDefault()
            let pollToUpdate = {...poll}
            pollToUpdate.option2Votes += 1
            pollToUpdate.votesCount += 1
            axios.put(`http://localhost:8000/api/poll/${id}`, 
                    pollToUpdate
                )
                    .then(res=>{
                        setHasVoted(true)
                        setPoll(res.data.poll)
                    })
                    .catch(err=>{
                        setErrorMessage("Your api has some problems!")
                        console.log(err)})
            }
            const handleVote3 = (e) => {
                e.preventDefault()
                let pollToUpdate = {...poll}
                pollToUpdate.option3Votes += 1
                pollToUpdate.votesCount += 1
                
                axios.put(`http://localhost:8000/api/poll/${id}`, 
                        pollToUpdate
                    )
                        .then(res=>{
                            setHasVoted(true)
                            setPoll(res.data.poll)
                        })
                        .catch(err=>{
                            setErrorMessage("Your api has some problems!")
                            console.log(err)})
                }
                const handleVote4 = (e) => {
                    e.preventDefault()
                    let pollToUpdate = {...poll}
                    pollToUpdate.option4Votes += 1
                    pollToUpdate.votesCount += 1
                    axios.put(`http://localhost:8000/api/poll/${id}`, 
                            pollToUpdate
                        )
                            .then(res=>{
                                setHasVoted(true)
                                setPoll(res.data.poll)
                            })
                            .catch(err=>{
                                setErrorMessage("Your api has some problems!")
                                console.log(err)})
                    }
    return(
       <>
        <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>

       <div className=" row" >
            <div className="col-lg-12 col-md-12 col-sm-12">
                <h2 className="text-center">{poll.question}</h2>
                {
                    !hasVoted?
                    <div className="d-flex justify-content-evenly">
                    <button onClick={handleVote1} className="btn btn-warning">{poll.option1}</button>
                    <button onClick={handleVote2} className="btn btn-warning">{poll.option2}</button>
                    { 
                      poll.option3 != ''?<button onClick={handleVote3} className="btn btn-warning">{poll.option3}</button>
                      : null
                      }
                      {
                      poll.option4 != ''?<button onClick={handleVote4} className="btn btn-warning">{poll.option4}</button>: null
                      }

    

                </div>:
                <div>
                    <p className="card-text">{poll.option1}: {poll.option1Votes}</p>
                    <p className="card-text">{poll.option2}: {poll.option2Votes}</p>
                    { 
                    poll.option3 != ''?<p className="card-text">{poll.option3}: {poll.option3Votes}</p>: null
                    }
                    {
                    poll.option4 != ''?<p className="card-text">{poll.option4}: {poll.option4Votes}</p>: null
                    }
                
               </div>
                
                }
            </div>
       </div>

      
       </>
    )
}
export default SinglePost;