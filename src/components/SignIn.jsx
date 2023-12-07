import { useState } from "react"
import { SignUp } from "./SignUp"
import { Link, generatePath } from "react-router-dom"
import {db} from '../firebase'
import { useNavigate } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore";
export const SignIn = ({myUser,setMyUser}) =>{
    //RLS - enable on tables within DB
    const navigate = useNavigate()
    const [type, setType] = useState('password');   
    const [isHidden, setIsHidden] = useState("show");
    const [myPassword,setMyPassword] = useState("")
    const [myUserName, setMyUsername] = useState("")
    const [correctMessage,setCorrectMessage] = useState("")
    async function dataCheck(e){
        e.preventDefault()
        const myUser = {
            username : myUserName,
            password : myPassword
        }
         await getData(myUser)
    } 
    const handleToggle = (event) => {
        event.preventDefault()
        if (isHidden === "show"){
           setType('text')
           setIsHidden("hide")
        } else {
           setType('password')
           setIsHidden("show")
    
        }
     }
    async function getData(userDetails){
        let checker = false
        const querySnapshot = await getDocs
        (collection(db, "Users"))
        querySnapshot.forEach((doc) => {
          const userData = doc.data()
          if ((userData.username === userDetails.username) && (userData.password === userDetails.password)){
             checker = true
             setMyUser(userData)
          }
        });
        if(checker){
            setCorrectMessage("Login Successful")
            navigate("/Home")
        }else{
            setCorrectMessage("Your Password or Username is incorrect! Please try again!")
        }

}


    return <div>
                <b><h2 id="overview" className="align-text">Overview</h2></b>
                <div id="centre-div">
                <div id="bordering-sign-in">
                <p className="align-text">A Fun web application you can use to track your daily activity on each day! You can track your activity through logging events and you can use our generated AI to check how long each event should last! All events are stored under a calendar where you can check what events you did on each day!</p>
                </div>
                </div>
        <h3 className="align-text">Enter sign in details below</h3><div>
        <form id="sign-in" className="align-text" onSubmit={dataCheck}>
            <div id="margin-div">     
               <label htmlFor="username">UserName:</label>
            <input id="form" className=" margin-input" onChange={(event) =>{
                event.preventDefault()
                setMyUsername(event.target.value)
                setCorrectMessage("")
            }} value={myUserName} placeholder="Enter username here">
            </input>
            </div>
            <div id="margin-div">
            <label htmlFor="password">Password: </label>
            <input id="form" className=" margin-input" type={type} onChange={(event) =>{
                event.preventDefault()
                setMyPassword(event.target.value)
                setCorrectMessage("")
            }} value={myPassword} placeholder="Enter password here"></input>
            </div>
              <button className="button" onClick={handleToggle}>{isHidden}
              </button>
        
            <button id="submit-log" className="button">Submit Here</button>
        </form>
        <p className="align-text">{correctMessage}</p>
        <Link to="/SignUp"><p className="align-text">Not Signed up? Click here to sign up</p></Link>
        <div id="sign-in-image">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/001/105/579/small/time-management-concept-illustration.jpg"/>
            </div>
    </div>
    </div>
}