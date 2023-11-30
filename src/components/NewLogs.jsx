import { useState,useEffect } from "react"
import { isTaken } from "../libs/functions"

export const NewLogs = ({setUserLogs,userLogs,myUser,setMyUser}) =>{
    const myTimes = userLogs.map((user) =>{
        return {time: user.Time, duration: user.Duration}
    })
    const checkTimes = userLogs.map((user) =>{
        return user.Time
    })
    const [activity,setActivity] = useState("")
    const [time,setTime] = useState("")
    const [isLogging,setIsLogging] = useState(false)
    const [duration,setDuration] = useState()
    const [errorMessage,setErrorMessage] = useState("")
    // we can do a database check to check the day, if day is same, check all times. If none of them overlap use the generateTimeArray to add in the relevant times
    function generateTimeArray() {
        const times = [];
        for (let hours = 0; hours < 24; hours++) {
          for (let minutes = 0; minutes < 60; minutes += 15) {
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            times.push(`${formattedHours}:${formattedMinutes}`);
          }
        }
        return times;
      }
      
      function checkingAdding(event){
        event.preventDefault()
        if (activity.split(" ").join("").length === 0){
            setErrorMessage("Please add a Name to the activity")
        }else if (duration >= 1440){
            setErrorMessage("Please ensure the duration is a reasonable time")            
        }

      }
     useEffect(() =>{
   
     },[time,activity]) 

    const timeArray = generateTimeArray();
    if (!isLogging){
    return (<div><button onClick={(event) =>{
        event.preventDefault()
        setIsLogging(true)
    }}>Add New Log</button>
    </div>
    )
    }else{
        return (<div>
            <form onSubmit={checkingAdding}><label>Activity: </label>
            <input value={activity} onChange={(event) =>{
                event.preventDefault()
                setActivity(event.target.value)
                setErrorMessage("")
            }} placeholder="Type Activity here here"></input>
            <label>Activity Time: </label>
            <select value={time} onChange={(event) =>{
                event.preventDefault()
                setTime(event.target.value)
                setErrorMessage("")
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
                setDuration(parseInt(event.target.value))
                setErrorMessage("")
            }} placeholder="Enter Duration here in minutes"></input>
            <button>Submit Here</button>
            <p>{errorMessage}</p>
    
            </form>
            <button onClick={(event) =>{
                event.preventDefault()
            setIsLogging(false)
            setActivity("")
            setTime("")
            setDuration()
            setErrorMessage("")
        }}>Cancel Log</button></div>)
    }
}