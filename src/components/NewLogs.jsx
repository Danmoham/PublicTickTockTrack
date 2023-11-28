import { useState,useEffect } from "react"

export const NewLogs = ({myUser,setMyUser}) =>{
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
      
      const timeArray = generateTimeArray();
    const [isLogging,setIsLogging] = useState(false)
    if (!isLogging){
    return (<div><button onClick={(event) =>{
        event.preventDefault()
        setIsLogging(true)
    }}>Add New Log</button>
    </div>
    )
    }else{
        return (<div>
            <form><label>Activity: </label>
            <input placeholder="Type Activity here here"></input>
            <label>Activity Time: </label>
            <select>
               {timeArray.map((each) =>{
                // example of how we can implement times that have already been spoken for.
                /*if (each === "00:15"){
                    return <option disabled>{each}</option>
                }else*/{
                    
                return <option>{each}</option>
                }
               })}
            </select>
            <label>Activity Duration(minutes): </label>
            <input placeholder="Enter Duration here in minutes"></input>
            <button>Submit Here</button>
    
            </form>
            <button onClick={(event) =>{
                event.preventDefault()
            setIsLogging(false)
        }}>Cancel Log</button></div>)
    }
}