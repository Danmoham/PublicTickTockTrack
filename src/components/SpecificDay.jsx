import { Link, useParams } from "react-router-dom"
import { Home } from "./Home"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState,useEffect } from "react";
import { transferTodaysLogs,convertTo12HourFormat,convertMinutesToListTime,convertTimeToMinutes,convertMinutesToTime } from "../libs/functions";
import { useNavigate } from "react-router-dom";

export const SpecificDay = ({setMyUser,myUser}) =>{
    const navigate = useNavigate()
    const [userLogs,setUserLogs] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [isuserLogsSet, setIsUserLogsSet] = useState(false)
    let durations = userLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0)
    durations = convertMinutesToTime(durations)
    let [hours,minutes] = durations.split(":")
    hours = hours.split("")
    minutes=minutes.split("")
    if (hours[0] === "0"){
        hours[0] = ""
    }
    if (minutes[0] === "0"){
        minutes[0] = ""
    }
    let {my_day} = useParams()
    let date = my_day.slice(0,15)
    let yesterday = new Date(Date.now() - 86400000)
    async function settingData(){
        const myData = await gettingData()
        setUserLogs([])
        let myLogs = (transferTodaysLogs(myData,date))
        if (myLogs.length === 0){
            setIsUserLogsSet(true)
        }
        await setUserLogs(myLogs)
       // let finalDuration = myLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0)
      
    } 

    useEffect(() =>{
        settingData().then(() =>{
            setIsLoading(false)
        })

    },[isLoading])
    async function gettingData(){
        const docRef = doc(db, "Users", myUser.username);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          let data = docSnap.data()
          return data.logs
        }
    }
    /*gettingData()
    console.log(my_day)
    console.log(String (new Date()))
    */
    if(Object.keys(myUser).length === 0) {
        return <div>
        <div id="centre-div">
        <p>You are not currently Logged In</p>
        </div>
        <div id="centre-div">
        <Link to="/SignIn"><p>Click here to be re-directed to the Login Page</p></Link>
        </div>
    </div>
    }
    else if (my_day.slice(0,15) === (String(new Date()).slice(0,15))){
        return <Home myUser={myUser} setMyUser={setMyUser}/>
        
    }else if (isLoading){
        return <div>
            <div id="centre-div">
        <h2 id="">Loading....</h2>
        </div>
        </div>
    }else if (my_day.length === 55 && !isLoading && userLogs.length > 0){
        return <div>
                       <div id="flexing">
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>

<div className='align-text' id="nav-bar">
         <button onClick={(event) =>{
            event.preventDefault()
            setIsLoading(true)
            navigate(`/day/${yesterday}`)
         }} id="nav-button" className="button">Yesterday</button>   <Link to="/home"><button id="nav-button" className="button">Today</button></Link>    <Link to="/Calendar"><button id="nav-button"className="button">Calendar</button></Link></div>                       
        <h3 id="margin-p" className="align-text">{myUser.username}'s activities logged on {date}</h3>
       <b><p className="align-text">You finished this day with {hours} hours and {minutes} minutes remaining.</p></b>
                    <div id="centre-div">               
                    <ul className="my-logs">
                    {userLogs.map((log) =>{
                        let myLog = convertTo12HourFormat(log.Time)
                    let myTime = (Number(log.Duration) + convertTimeToMinutes(log.Time))  
                    myTime = convertMinutesToListTime(myTime)
                    myTime = convertTo12HourFormat(myTime)

                        return <div className="my-log">
                            <li className="activity">{log.Activity}</li>
                            <li>This lasted from {myLog} to {myTime}</li>
                            <li>Duration: {log.Duration} Minutes</li>
                            <br></br>
                        </div>
                    })
                    }
                    </ul>
                    </div>
         
        </div>
}else if (my_day.length === 55 && userLogs.length === 0 && !isLoading && isuserLogsSet){
    return <div>
                   <div id="flexing">
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>

        <div className='align-text' id="nav-bar">

  <button onClick={(event) =>{
            event.preventDefault()
            setIsLoading(true)
            navigate(`/day/${yesterday}`)
         }} id="nav-button" className="button">Yesterday</button>   <Link to="/home"><button id="nav-button" className="button">Today</button></Link>    <Link to="/Calendar"><button id="nav-button"className="button">Calendar</button></Link> 
         </div>
                    <h4 className="align-text">{myUser.username} logged no activites on {date}</h4>
                    <div id="sign-in-image">
                    <img id="img" src="https://static.vecteezy.com/system/resources/previews/009/687/647/original/yellow-sad-face-emoji-file-png.png"/>
                    </div>
                    <div id="flexing">
    
    </div>
    </div>
  
}else{
        return <div><Link to="/calendar"><p>Invalid Date! Click here to pick from the calendar!</p></Link></div>
    }
    // should be 55 digits
    
}