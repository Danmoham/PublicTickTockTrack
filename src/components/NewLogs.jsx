import { useState,useEffect } from "react"
import { isTaken } from "../libs/functions"
import { generateTimeArray } from "../libs/functions"
import { checkingSubmitTime } from "../libs/functions"
import { updateDoc,doc,arrayUnion } from "firebase/firestore"
import { db } from "../firebase"

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
    // we can do a database check to check the day, if day is same, check all times. If none of them overlap use the generateTimeArray to add in the relevant times
  
      
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
                    // Not Working - To Fix!!
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
           <b> <p className="align-text">Unsure how long this will take? Click here to get a recommended time!</p></b>
            <p className="align-text">{errorMessage}</p>
                <div id="cancel-form">
                <p className="margin-input align-text">Want to cancel the Log?</p>
            <button className="align-text delete-button" onClick={(event) =>{
                event.preventDefault()
            setIsLogging(false)
            setActivity("")
            setTime("")
            setDuration()
            setErrorMessage("")
            setCorrectMessage("")
        }}>Click Here</button>
        </div>
        
        </div>)
    }
}