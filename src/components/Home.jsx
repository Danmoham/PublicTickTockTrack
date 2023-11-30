import { useState } from "react";
import { Link } from "react-router-dom";
import { NewLogs } from "./NewLogs";
import { CurrentLogs } from "./CurrentLogs";

export const Home = ({myUser,setMyUser}) =>{
    const [userLogs,setUserLogs] = useState([])
    const [isLoading,setIsLoading] = useState("")
      let date = String(new Date());
      date = date.slice(0,15)
      const [currentDate, setCurrentDate] = useState(date);
     

    if (Object.keys(myUser).length !== 0 ){
    return (
    <div id="Header">
        <h2>Today's tracking so Far!</h2>
        <p>You're signed in as: {myUser.username}</p>
        <button onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Click here to sign out</button>
        <p>Today's Date: {currentDate}</p>
        <p>Yesterday | <Link to="/home">Today</Link>  | <Link to="/Calendar">Full Calendar</Link></p>
        <NewLogs userLogs={userLogs} setUserLogs={setUserLogs} myUser={myUser} setMyUser={setMyUser} />
        <h3>Current Logs for the day:</h3>
        <CurrentLogs userLogs={userLogs} setUserLogs={setUserLogs} myUser={myUser} currentDate={currentDate}/>
        </div>
    )
    }else{
        return <div>
            <h2>You're Home</h2>
            <p>You are not currently Logged In</p>
            <Link to="/SignIn"><p>Click here to be re-directed to the Login Page</p></Link>
        </div>
    }
}