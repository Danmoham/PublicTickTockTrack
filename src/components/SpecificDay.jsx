import { Link, useParams } from "react-router-dom"
export const SpecificDay = () =>{
    let {my_day} = useParams()
    if (my_day.length === 55){
        return <div><p>{my_day}</p></div>
    }else{
        return <div><Link to="/calendar"><p>Invalid Date! Click here to pick from the calendar!</p></Link></div>
    }
    // should be 55 digits
    
}