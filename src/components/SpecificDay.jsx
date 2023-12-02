import { Link, useParams } from "react-router-dom"
import { Home } from "./Home"
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState,useEffect } from "react";
import { transferTodaysLogs,convertTo12HourFormat } from "../libs/functions";

export const SpecificDay = ({setMyUser,myUser}) =>{
    const [userLogs,setUserLogs] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    let {my_day} = useParams()
    let date = my_day.slice(0,15)

    async function settingData(){
        const myData = await gettingData()
        let myLogs = (transferTodaysLogs(myData,date))
        console.log(myLogs)
        await setUserLogs(myLogs)
       // let finalDuration = myLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0)
      
    } 

    useEffect(() =>{
        settingData()
        setIsLoading(false)

    },[isLoading])
    async function gettingData(){
        const docRef = doc(db, "Users", "Danny");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          let data = docSnap.data()
          console.log(data.logs)
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
        
    }else if (my_day.length === 55 && isLoading){
        
        return <div><p>{my_day}</p>
        <p>Loading....</p>
        </div>
    }else if (my_day.length === 55 && !isLoading){
        return <div><p>{my_day}</p>
        <p>You're signed in as: {myUser.username}</p>
        <button onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Click here to sign out</button>
        <p>This Date {my_day}</p>
        <p>Yesterday | <Link to="/home">Today</Link>  | <Link to="/Calendar">Full Calendar</Link></p>
                    <p>Your Logs on this Day</p>
                    <ul>
                    {userLogs.map((log) =>{
                        let myLog = convertTo12HourFormat(log.Time)
                        return <div>
                            <li>Activity: {log.Activity}</li>
                            <li>The time this is booked in {myLog}</li>
                            <li>Duration: {log.Duration} Minutes</li>
                        </div>
                    })
                    }
                    </ul>

        </div>
    }else{
        return <div><Link to="/calendar"><p>Invalid Date! Click here to pick from the calendar!</p></Link></div>
    }
    // should be 55 digits
    
}