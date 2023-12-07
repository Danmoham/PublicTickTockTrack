import { useEffect,useState } from "react"
import { db } from "../firebase";
import { arrayRemove, doc, getDoc,updateDoc } from "firebase/firestore";
import { convertMinutesToTime } from "../libs/functions";
import { convertTo12HourFormat } from "../libs/functions";
import { transferTodaysLogs } from "../libs/functions";
import { convertTimeToMinutes } from "../libs/functions";
import { convertMinutesToListTime } from "../libs/functions";


export const CurrentLogs = ({userLogs,setUserLogs,myUser,currentDate,setIsNewlyLogged,isNewlyLogged}) =>{
    const [isLoading,setIsLoading] = useState(true)
    const [timeRemaining,setTimeRemaining] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const durations = userLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0)
    const [myDuration,setMyDuration] = useState(userLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0))
    const [isTimeLoaded,setIsTimeLoaded] = useState(false)

    async function setDuration (){
        await setMyDuration(userLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0))

   }

    async function settingData(){
        const myData = await gettingData()
        let myLogs = (transferTodaysLogs(myData,currentDate))
        await setUserLogs(myLogs)
        let finalDuration = myLogs.map((user) =>parseInt(user.Duration)).reduce((a,b) => a+b,0)
        setTimeRemaining(convertMinutesToTime(finalDuration))    
        setIsLoading(false)
    }
    async function gettingData(){
        const docRef = doc(db, "Users", myUser.username);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          let data = docSnap.data()
          return data.logs
        }
    }
    const myLogs = transferTodaysLogs(myUser.logs, currentDate)
      useEffect(() =>{
        
        settingData()
        setTimeRemaining(convertMinutesToTime(durations))    
        setIsTimeLoaded(true)
      
       
    },[isLoading])

    useEffect(() =>{
        if (isNewlyLogged){
            setIsLoading(true)
            settingData()
            //setTimeRemaining(convertMinutesToTime(myDuration))    
            setErrorMessage("")
            setIsNewlyLogged(false)
            setIsLoading(false)
        }
    },[isNewlyLogged])

    if (!isLoading && userLogs.length === 0){
        return <div><p className="align-text">You do not currently have any activities Logged, once activities are added they will come up here!</p></div>

    }else if(!isLoading){
    return <div>
        <b><p className="align-text">Time Remaining: {timeRemaining}</p></b>
        <div id="centre-div">
        <ul className="my-logs">
            {userLogs.map((log) =>{
                let myLog = convertTo12HourFormat(log.Time)  
                let myTime = (Number(log.Duration) + convertTimeToMinutes(log.Time))  
                myTime = convertMinutesToListTime(myTime)
                myTime = convertTo12HourFormat(myTime)

                //console.log(myTime)
              //  let mytimeFinish = convertTo12HourFormat(myTime)
                return <div className="my-log">
                    <li className="activity">{log.Activity}</li>
                    <li>Scheduled: {myLog} till {myTime}</li>
                    <li> Duration: {log.Duration} Minutes</li>
                    <button className="delete-button" onClick={async (event) =>{
                        event.preventDefault()
                        const docRef = doc(db, "Users", myUser.username)
                        let date = String(new Date());
                        date = date.slice(0,15)
                        let deleteLog = {
                            Time: log.Time,
                            Duration:log.Duration,
                            Activity: log.Activity,
                            Date: date
                        }
                        const data = {
                            logs : arrayRemove(deleteLog)
                        }
                        try{
                            await updateDoc(docRef,data)
                            }catch(e){
                                setErrorMessage("There has been a DB error, please try again later")
                            }
                        setIsNewlyLogged(true)
                        }}>Delete Entry</button>
                </div>
            })}
        </ul>
        </div>
        <p>{errorMessage}</p>
    </div>
    }else{
        return <div id="centre-div">
            <h3 id="align-text">Loading....</h3>
        </div>
    }
}