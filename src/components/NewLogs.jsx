import { useState,useEffect } from "react"
import { isTaken } from "../libs/functions"
import { generateTimeArray } from "../libs/functions"
import { checkingSubmitTime } from "../libs/functions"
import { updateDoc,doc,arrayUnion } from "firebase/firestore"
import { db } from "../firebase"
import APIKEY from "../libs/config"
import OpenAI from "openai"

export const NewLogs = ({setUserLogs,userLogs,myUser,setMyUser,setIsNewlyLogged,isNewlyLogged}) =>{
   
    const timeArray = generateTimeArray();
    const myTimes = userLogs.map((user) =>{
        return {time: user.Time, duration: user.Duration}
    })
    const checkTimes = userLogs.map((user) =>{
        return user.Time
    })
    const [activity,setActivity] = useState("")
    const [time,setTime] = useState("00:00")
    const [isLogging,setIsLogging] = useState(false)
    const [duration,setDuration] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [correctMessage,setCorrectMessage] = useState("")
    const [aiActivityTime,setAiActivityTime] = useState("")
    const [hasBeenFound,setHasBeenFound] = useState(false)
    // we can do a database check to check the day, if day is same, check all times. If none of them overlap use the generateTimeArray to add in the relevant times
    async function callOpenAiAPI(){
        const openai = new OpenAI({
            apiKey: APIKEY,
            dangerouslyAllowBrowser: true 
        })
        const assistant = await openai.beta.assistants.retrieve("asst_xwdt8zEsF6bQOCr7iH4UKUpM")
        const thread = await openai.beta.threads.create()
        const message = await openai.beta.threads.messages.create(thread.id,{role: "user",
        content: `How long does it take the average person to eat breakfast`
    })

    const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
    }) 
    console.log(run)
    const retrieverun = await openai.beta.threads.runs.retrieve(thread.id,run.id)
    console.log(retrieverun)
    // only when retrieverun.status is true proceed.
    
    const messages = await openai.beta.threads.messages.list(thread.id)
    console.log(messages)
   
   
}
  
   // callOpenAiAPI()
      
      async function checkingAdding(event){
        event.preventDefault()
        if (activity.split(" ").join("").length === 0){
            setErrorMessage("Please add a Name to the activity")
        }else if (parseInt(duration) >= 1440){
            setErrorMessage("Please ensure the duration is a reasonable time")            
        } else if (isNaN(Number(duration))){
            setErrorMessage("please ensure this is a number")
        }else if (checkingSubmitTime(time,Number(duration),myTimes)){
            setErrorMessage("Sorry, this event overlaps with another event! Please try again")
        }else{
            let date = String(new Date());
            date = date.slice(0,15)
            const docRef = doc(db, "Users", myUser.username)
            let newLog = {
                Time: time,
                Duration:duration,
                Activity: activity,
                Date: date
            }
            const data = {
                logs : arrayUnion(newLog)
            }
            try{
            await updateDoc(docRef,data)
            }catch(e){
                console.log("there has been an error")
                setErrorMessage("There has been a DB error, please try again later")
            }
            //setUserLogs([...userLogs,newLog])
            setActivity("")
            setTime("00:00")
            setDuration("")
            setIsNewlyLogged(true)
            setIsLogging(false)
            setCorrectMessage("This has been Logged!")
        }

      }
     useEffect(() =>{
   
     },[time,activity]) 

    if (!isLogging){
    return (<div>
        <div id="adding-log">
        <b><p className="margin-input">Click here to add a new log</p></b>
        <button className="button" onClick={(event) =>{
        event.preventDefault()
        setIsLogging(true)
    }}>Add New Log</button>
    </div>
    <p className="align-text">{correctMessage}</p>
    </div>
    )
    }else{
        return (<div>
            <form className="cancel-log" onSubmit={checkingAdding}>
                <div id="seperators">
                <label className="margin-input"> Activity: </label>
            <input id="form" className="form-control" value={activity} onChange={(event) =>{
                event.preventDefault()
                setActivity(event.target.value)
                setErrorMessage("")
                setCorrectMessage("")
            }} placeholder="Type Activity here here"></input>
            </div>
           
            <div id="seperators">
            <label className="margin-input">Duration(minutes): </label>
            <input id="duration-form" className="form-control" value={duration} onChange={(event) =>{
                event.preventDefault()
                setDuration((event.target.value))
                setErrorMessage("")
                setCorrectMessage("")
            }} placeholder="Duration"></input>
            </div>
            <div id="seperators">
            <label className="margin-input">Activity Time: </label>
            <select className="select" key={time} value={time} onChange={(event) =>{
                event.preventDefault()
                setTime(event.target.value)
                setErrorMessage("")
                setCorrectMessage("")
            }}>
                <option disabled>Select Time</option>
               {timeArray.map((each) =>{
                if (myTimes.includes(each)){
                    return <option disabled>{each}</option>
                }else if (isTaken(each,myTimes)){
                    return <option disabled>{each}</option> 
                }
                else{
                return <option>{each}</option>
                }
               })}
            </select>
            </div>
            <div id="seperators">
            <button id="add-button" className="button">Submit Here</button>
            </div>
            </form>
            <div id="time-generate">
           <b> <p className="align-text margin-input">Unsure how long this will take?</p></b><button onClick={(event) =>{
            console.log(event)
           }}   className="button">Click to recommend a time </button>
           </div>
           {aiActivityTime !== "" ? <p>You have been suggested {aiActivityTime} based on your activity {activity}</p>
           : null
           }
            <p className="align-text">{errorMessage}</p>
                <div id="cancel-form">
                <p className="margin-input align-text">Want to cancel the Log?</p>
            <button className="align-text delete-button" onClick={(event) =>{
                event.preventDefault()
            setIsLogging(false)
            setActivity("")
            setTime("00:00")
            setDuration()
            setErrorMessage("")
            setCorrectMessage("")
        }}>Click Here</button>
        </div>
        
        </div>)
    }
}