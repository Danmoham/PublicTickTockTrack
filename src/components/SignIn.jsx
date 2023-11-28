import { useState } from "react"
import { SignUp } from "./SignUp"
import { Link, generatePath } from "react-router-dom"
import {db} from '../firebase'
import { useNavigate } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore";
export const SignIn = () =>{
    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');   
    const [isHidden, setIsHidden] = useState("hide");
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
        if (isHidden === "hide"){
           setType('text')
           setIsHidden("show")
        } else {
           setType('password')
           setIsHidden("hide")
    
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
          }
        });
        if(checker){
            setCorrectMessage("Login Successful")
            navigate("/Home")
        }else{
            setCorrectMessage("Incorrect Details, please try again!")
        }

}


    return <div><h2>Enter sign in details below</h2><div>
        <form onSubmit={dataCheck}>
            <label htmlFor="username">UserName:</label>
            <input onChange={(event) =>{
                event.preventDefault()
                setMyUsername(event.target.value)
                setCorrectMessage("")
            }} value={myUserName} className="username" placeholder="Enter username here">
            </input>
            <label htmlFor="password">Enter Password Here</label>
            <input type={type} onChange={(event) =>{
                event.preventDefault()
                setMyPassword(event.target.value)
                setCorrectMessage("")
            }} value={myPassword} placeholder="Enter password here" className="password"></input>
              <button class="flex justify-around items-center" onClick={handleToggle}>{isHidden}
              </button>
        
            <button>Submit Here</button>
        </form>
        <p>{correctMessage}</p>
        <Link to="/SignUp"><p>Not Signed up? Click here to sign up</p></Link>
    </div>
    </div>
}