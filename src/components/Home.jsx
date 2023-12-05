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
         <div id="flexing">
       <b> <p className="margin-input">You're signed in as: {myUser.username}</p></b>
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>
        <h2 className="align-text">Today's tracking so Far!</h2>
        <div className="align-text">
        <b><p className="margin-input">Today's Date: {currentDate}</p></b>
        <h4 id="nav-section"> <Link to={`/day/${yesterday}`}> Yesterday</Link> | <Link to="/home">Today</Link>  | <Link to="/Calendar">Full Calendar</Link></h4>
        </div>
        <NewLogs userLogs={userLogs} isNewlyLogged={isNewlyLogged} setIsNewlyLogged={setIsNewlyLogged} setUserLogs={setUserLogs} myUser={myUser} setMyUser={setMyUser} />
        <h3 className="align-text">Current Logs for the day:</h3>
        <CurrentLogs isNewlyLogged={isNewlyLogged} setIsNewlyLogged={setIsNewlyLogged} userLogs={userLogs} setUserLogs={setUserLogs} myUser={myUser} currentDate={currentDate}/>
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