import { Link, useParams } from "react-router-dom"
import { Home } from "./Home"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState,useEffect } from "react";
import { transferTodaysLogs,convertTo12HourFormat } from "../libs/functions";

export const SpecificDay = ({setMyUser,myUser}) =>{
    const [userLogs,setUserLogs] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [isuserLogsSet, setIsUserLogsSet] = useState(false)
    let {my_day} = useParams()
    let date = my_day.slice(0,15)
    let yesterday = new Date(Date.now() - 86400000)

    async function settingData(){
        const myData = await gettingData()
        let myLogs = (transferTodaysLogs(myData,date))
        if (myLogs.length === 0){
            setIsUserLogsSet(true)
        }
        await setUserLogs(myLogs)
       // let finalDuration = myLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0)
      
    } 

    useEffect(() =>{
        settingData()
        setIsLoading(false)

    },[])
    async function gettingData(){
        const docRef = doc(db, "Users", "Danny");
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
        <h2>You're Home</h2>
        <p>You are not currently Logged In</p>
        <Link to="/SignIn"><p>Click here to be re-directed to the Login Page</p></Link>
    </div>
    }
    else if (my_day.slice(0,15) === (String(new Date()).slice(0,15))){
        return <Home myUser={myUser} setMyUser={setMyUser}/>
        
    }else if (isLoading){
        return <div>
        <p>Loading....</p>
        </div>
    }else if (my_day.length === 55 && !isLoading && userLogs.length > 0){
        return <div>
        <div id="flexing">
       <b> <p className="margin-input">You're signed in as: {myUser.username}</p></b>
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>
        <h4 className='align-text' id="nav-section"> <Link to={`/day/${yesterday}`}> Yesterday</Link> | <Link to="/home">Today</Link>  | <Link to="/Calendar">Full Calendar</Link></h4>
                    <h4 className="align-text">The activities you logged on {date}</h4>
                    <div id="centre-div">               
                    <ul className="my-logs">
                    {userLogs.map((log) =>{
                        let myLog = convertTo12HourFormat(log.Time)
                        return <div className="my-log">
                            <li>Activity: {log.Activity}</li>
                            <li>The time this is booked in {myLog}</li>
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
   <b> <p className="margin-input">You're signed in as: {myUser.username}</p></b>
    <button className="button" onClick={(event) =>{
        event.preventDefault()
        setMyUser({})
    }}>Sign Out</button>
    </div>
    <h4 className='align-text' id="nav-section"> <Link to={`/day/${yesterday}`}> Yesterday</Link> | <Link to="/home">Today</Link>  | <Link to="/Calendar">Full Calendar</Link></h4>
                    <h4 className="align-text">You Logged no activites on {date}</h4>
                    <div id="sign-in-image">
                    <img id="img" src="https://static.vecteezy.com/system/resources/previews/009/687/647/original/yellow-sad-face-emoji-file-png.png"/>
                    </div>
    </div>
}else{
        return <div><Link to="/calendar"><p>Invalid Date! Click here to pick from the calendar!</p></Link></div>
    }
    // should be 55 digits
    
}