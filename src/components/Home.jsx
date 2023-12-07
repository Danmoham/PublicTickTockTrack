import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewLogs } from "./NewLogs";
import { CurrentLogs } from "./CurrentLogs";

export const Home = ({myUser,setMyUser}) =>{
    const [userLogs,setUserLogs] = useState([])
    const [isNewlyLogged,setIsNewlyLogged] = useState(false)
      let date = String(new Date());
      date = date.slice(0,15)
      const [currentDate, setCurrentDate] = useState(date);
      let yesterday = new Date(Date.now() - 86400000)
     useEffect(() =>{

     },[])

    if (Object.keys(myUser).length !== 0 ){
    return (
    <div id="Header">
       
        <div className="align-text">
        <div id="nav-bar">
         <Link to={`/day/${yesterday}`}> <button id="nav-button" className="button">Yesterday</button></Link>   <Link to="/home"><button id="nav-button" className="button">Today</button></Link>    <Link to="/Calendar"><button id="nav-button"className="button">Calendar</button></Link>
        </div>
        <h2 className="align-text">{myUser.username}'s Daily Tracker! </h2>

        <b><p className="margin-input">Today's Date: {currentDate}</p></b>

        </div>
        <NewLogs userLogs={userLogs} isNewlyLogged={isNewlyLogged} setIsNewlyLogged={setIsNewlyLogged} setUserLogs={setUserLogs} myUser={myUser} setMyUser={setMyUser} />
        <h3 className="align-text">Current Logs for the day:</h3>
        <CurrentLogs isNewlyLogged={isNewlyLogged} setIsNewlyLogged={setIsNewlyLogged} userLogs={userLogs} setUserLogs={setUserLogs} myUser={myUser} currentDate={currentDate}/>
        <div id="flexing">
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>
         </div>
        
    )
    }else{
        return <div>
            <div id="centre-div">
            <p>You are not currently Logged In</p>
            </div>
            <div id="centre-div">
            <Link to="/SignIn"><p>Click here to be re-directed to the Login Page</p></Link>
            </div>
        </div>
    }
}