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
    const [hasClicked,setHasClicked] = useState(false)
    
    // we can do a database check to check the day, if day is same, check all times. If none of them overlap use the generateTimeArray to add in the relevant times
    async function callOpenAiAPI(){
        const openai = new OpenAI({
            apiKey: APIKEY,
            dangerouslyAllowBrowser: true 
        })
        const assistant = await openai.beta.assistants.retrieve("asst_xwdt8zEsF6bQOCr7iH4UKUpM")
        const thread = await openai.beta.threads.create()
        const message = await openai.beta.threads.messages.create(thread.id,{role: "user",
        content: `How long does it take the average person to ${activity}`
    })

    let run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
    }) 
    while (run.status !== "completed"){
         run = await openai.beta.threads.runs.retrieve(thread.id,run.id)
        console.log(run.status)
    }
    
    // only when retrieverun.status is true proceed.
    
    const messages = await openai.beta.threads.messages.list(thread.id)
        setAiActivityTime(messages.data[0].content[0].text.value)
        setHasBeenFound(true)

    
   
   
}
        
      async function checkingAdding(event){
        event.preventDefault()
        if (activity.split(" ").join("").length === 0){
            setErrorMessage("Please add a Name to the activity")
        }else if (parseInt(duration) >= 1440){
            setErrorMessage("Please ensure the duration is a reasonable time")            
        } else if (isNaN(Number(duration)) || duration.length === 0){
            setErrorMessage("please a number is filled in, in the durations field")
        }else if (checkingSubmitTime(time,Number(duration),myTimes)){
            setErrorMessage("Sorry, this event overlaps with another event! Please try a different time")
        }else{
            setErrorMessage("Please wait while we process the submission")
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
                setErrorMessage("There has been a DB error, please try again later")
            }
            //setUserLogs([...userLogs,newLog])
            setActivity("")
            setTime("00:00")
            setDuration("")
            setIsNewlyLogged(true)
            setIsLogging(false)
            setCorrectMessage("This has been Logged!")
            setHasClicked(false)
            setHasBeenFound(false)
            setErrorMessage("")
        }

      }
     useEffect(() =>{
   
     },[time,activity]) 

    if (!isLogging){
    return (<div>
        <div id="adding-log">
        <button className="button" onClick={(event) =>{
        event.preventDefault()
        setIsLogging(true)
    }}>Add A New Activity Here</button>
    </div>
    <p className="align-text">{correctMessage}</p>
    </div>
    )
    }else{
        return (
        <div>
            <>
            <div id="centre-div">
            <div id="small-div">
            <p id="small-p">When adding a new activity, always type in the name of the activity first then select a duration and the time you would like to do it, if you are unsure of a time you can generate a reccommended time based on your activity. <b>When using generative AI, please be very specific with your prompts. E.G Reading 20 pages of a book.</b></p>
             </div>
             </div>  
            <div id="centre-div">
            <form className="cancel-log" onSubmit={checkingAdding}>
             
                <div id="seperators">
                <label className="margin-input"> Activity: </label>
            <textarea id="form" className="form-control" value={activity} onChange={(event) =>{
                event.preventDefault()
                setActivity(event.target.value)
                setErrorMessage("")
                setCorrectMessage("")
            }} placeholder="Type Activity here"></textarea>
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
            </div>
            </>
            <div>  
      
  {hasClicked ? (
    // Content to display when hasClicked is true
    <>
    {!hasBeenFound ? (
   <b> <p className="align-text margin-input">Loading a time from our generated AI, please wait.....</p></b>
    ) : (
        <b><p className="align-text">Based on our generative AI predictions, {activity} should take on average {aiActivityTime} to complete.</p></b>
    )
    }
   </>
  ) : (
    // Content to display when hasClicked is false
    <>
        <p id="my-error">{errorMessage}</p>
       <b><p className="align-text"></p></b>

    <div id="time-generate">
    <button
      onClick={(event) => {
        if (activity.length > 0){
            setHasClicked(true);
            callOpenAiAPI().then((data) =>{
                setHasBeenFound(true)
            })
            .catch((err) =>{
                console.log(err)
                setErrorMessage("There has been an error fetching your request, try again later")
            })

        }else{
            setErrorMessage("Please type in a title above for the Activity you want a recommendation for")
        }
      }}
      className="button"
    >
      Generate an AI reccommended time here!
    </button>
    </div>
    </>
  )}
</div>
<div id="cancel-form">
  <p className="margin-input align-text">Want to cancel the Log?</p>
  <button
    className="align-text delete-button"
    onClick={(event) => {
      event.preventDefault();
      setIsLogging(false);
      setActivity("");
      setTime("00:00");
      setDuration();
      setErrorMessage("");
      setCorrectMessage("");
      setHasClicked(false)
      setHasBeenFound(false)
    }}
  >
    Click Here
  </button>
</div>
        
        </div>)

    }
}