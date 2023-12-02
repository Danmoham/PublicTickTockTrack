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
    return (<div><button onClick={(event) =>{
        event.preventDefault()
        setIsLogging(true)
    }}>Add New Log</button>
    <p>{correctMessage}</p>
    </div>
    )
    }else{
        return (<div>
            <form onSubmit={checkingAdding}><label>Activity: </label>
            <input value={activity} onChange={(event) =>{
                event.preventDefault()
                setActivity(event.target.value)
                setErrorMessage("")
                setCorrectMessage("")
            }} placeholder="Type Activity here here"></input>
            <label>Activity Time: </label>
            <select key={time} value={time} onChange={(event) =>{
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
            <label>Activity Duration(minutes): </label>
            <input value={duration} onChange={(event) =>{
                event.preventDefault()
                setDuration((event.target.value))
                setErrorMessage("")
                setCorrectMessage("")
            }} placeholder="Enter Duration here in minutes"></input>
            <button>Submit Here</button>
            <p>Unsure how long this will take? Click here to get a recommended time!</p>
            <p>{errorMessage}</p>
    
            </form>
            <button onClick={(event) =>{
                event.preventDefault()
            setIsLogging(false)
            setActivity("")
            setTime("")
            setDuration()
            setErrorMessage("")
            setCorrectMessage("")
        }}>Cancel Log</button></div>)
    }
}