import { Link, useParams } from "react-router-dom"
import { Home } from "./Home"
export const SpecificDay = ({setMyUser,myUser}) =>{
    let {my_day} = useParams()
    console.log(my_day)
    console.log(String (new Date()))
    if (my_day.slice(0,15) === (String(new Date()).slice(0,15))){
        return <Home myUser={myUser} setMyUser={setMyUser}/>
        
    }else if (my_day.length === 55){
        return <div><p>{my_day}</p></div>
    }else{
        return <div><Link to="/calendar"><p>Invalid Date! Click here to pick from the calendar!</p></Link></div>
    }
    // should be 55 digits
    
}