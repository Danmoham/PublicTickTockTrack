import { useState } from "react"
import {setDoc,doc,getDocs} from 'firebase/firestore'
import { db } from "../firebase"
import {passwordStrength} from 'check-password-strength'
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { collection } from "firebase/firestore"
import { all } from "axios"

export const SignUp = () =>{


const [username,setUsername] = useState("")
const [errorMessage,setErrorMessage] = useState("")
const [correctMessage,setCorrectMessage] = useState("")
const [password,setPassword] = useState("")
const [checkPassword,setCheckPassword] = useState("")
const [allUsers,setAllUsers] = useState([])
const [isLoading,setIsLoading] = useState(true)

useEffect(() =>{
    callUsers().then(() =>{
        setIsLoading(false)
    })
   
        


},[correctMessage])

async function callUsers () {
    const querySnapshot = await getDocs
    (collection(db, "Users"))
    const myArray = []
 querySnapshot.forEach((doc) => {
      const userData = doc.data()
      myArray.push(userData)
    
    }); 
    setAllUsers(myArray)

}
const checkerUsers = (allUsers) =>{
   return allUsers.filter((user) =>{
        return user.username === username
    })
   
}
async function addToDataBase (){
    const docRef = await setDoc(doc(db, "Users",username), {
    username: username,
    password: password,
    calendar: [],
    });
}

function submitChecker(event){
    let myPassword = passwordStrength(password)
    event.preventDefault()
    if (username.length < 1){
        setErrorMessage("the username is blank, please try again")
    }else if ((checkerUsers(allUsers).length > 0)){
        setErrorMessage(`This Username has been taken, please try again.`)
     }else if (password !== checkPassword){
        setErrorMessage(`The passwords do not match! Please try again`)
    }else if (myPassword.id < 2){
       setErrorMessage(`Your password strength is currently ${myPassword.value}! Please make this stronger by adding more numbers or special characters`)
    }else{
       setErrorMessage("")
       addToDataBase()
       setCorrectMessage(`${username} has now been created! Please click Login to proceed`)
    }
    event.preventDefault()

}
    if (!isLoading){
    return <div><h2>Sign Up Here</h2>
    <form onSubmit={submitChecker}>
        <label htmlFor="username">Enter UserName Here: </label>
        <input onChange={(event) =>{
            setUsername(event.target.value)
            setCorrectMessage("")
            setErrorMessage("")
        }} id="username" placeholder="Type Username Here"></input>
        <label htmlFor="password">please enter your password: </label>
        <input onChange={(event) =>{
            setPassword(event.target.value)
            setCorrectMessage("")
            setErrorMessage("")
        }} placeholder="Please Enter Password" id="password"></input>
        <label htmlFor="checkPassword">Please re-enter your password to confirm this: </label>
        <input id="checkPassword" onChange={(event) =>{
            setCheckPassword(event.target.value)
            setCorrectMessage("")
            setErrorMessage("")
        }}placeholder="Re-enter Password Here"></input>
        <button>Submit</button>
    </form>
    <p>{errorMessage}</p>
    <p>{correctMessage}</p>
    <Link to="/SignIn">Click here to Sign in</Link>
    </div>
}else{
    return <h2>Loading...</h2>

}
}