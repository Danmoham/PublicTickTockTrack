import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
       <b> <p className="margin-input">You're signed in as: {myUser.username}</p></b>
        <button className="button" onClick={(event) =>{
            event.preventDefault()
            setMyUser({})
        }}>Sign Out</button>
        </div>
        <h2>Calendar</h2>
    <p><Link to={`/day/${yesterday}`}> Yesterday </Link> | <Link to="/home">Today</Link> | <Link to="/Calendar">Full Calendar</Link></p>
    <p>Select a date to see what you have tracked on that day!</p>
          <Calendar onChange={onChange} onClickDay={(event) => setIsClicked(true)} value={value} />

    </div>
}
else{
    return <div>
    <h2>You're Home</h2>
    <p>You are not currently Logged In</p>
    <Link to="/SignIn"><p>Click here to be re-directed to the Login Page</p></Link>
</div>
}
}