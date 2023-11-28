import { useState } from "react";
import { Link } from "react-router-dom";
import { NewLogs } from "./NewLogs";

export const Home = ({myUser,setMyUser}) =>{
    console.log(myUser)
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      } 
      let date = String(new Date());
      date = date.slice(0,16)
      const [currentDate, setCurrentDate] = useState(date);
      console.log("Tue Nov 28 2023 ".length)
     

    if (Object.keys(myUser).length !== 0 ){
    return (
    <div id="Header">
        <h2>You're home</h2>
        <p>You're signed in as: {myUser.username}</p>
        <button onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Click here to sign out</button>
        <p>Today's Date: {currentDate}</p>
        <p>Yesterday | <Link to="/home">Today</Link>  | <Link to="/Calendar">Full Calendar</Link></p>
        <p>Time Remaining on Today is x</p>
        <NewLogs myUser={myUser} setMyUser={setMyUser} />
        <p>Current Logs: </p>
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