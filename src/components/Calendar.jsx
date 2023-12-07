import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';


export const MyCalendar = ({myUser,setMyUser}) =>{
    const navigate = useNavigate()
    const [value, onChange] = useState(new Date());
    const [isClicked, setIsClicked] = useState(false)
    let yesterday = new Date(Date.now() - 86400000)
    useEffect(() =>{
        if (isClicked){
            navigate(`/day/${value}`)
        }
    },[isClicked])
    if (Object.keys(myUser).length !== 0 ){
    return <div>
                <div id="flexing">
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>

        <div className='align-text' id="nav-bar">
         <Link to={`/day/${yesterday}`}> <button id="nav-button" className="button">Yesterday</button></Link>   <Link to="/home"><button id="nav-button" className="button">Today</button></Link>    <Link to="/Calendar"><button id="nav-button"className="button">Calendar</button></Link>
        </div>           <h2 className='align-text'>{myUser.username}'s Calendar</h2>
 <b><p className='align-text'>Select a date to see what you have tracked on that day!</p></b>
    <div id="cal-div">

          <Calendar onChange={onChange} onClickDay={(event) => setIsClicked(true)} value={value} />
          </div>
    </div>
}
else{
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