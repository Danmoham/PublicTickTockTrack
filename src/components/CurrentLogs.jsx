import { useEffect,useState } from "react"
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";


export const CurrentLogs = ({userLogs,setUserLogs,myUser,currentDate}) =>{
    const [isLoading,setIsLoading] = useState(true)
    function transferTodaysLogs(array,selectedDate){
            let myArray = array.filter((item) =>{
                return (item.Date === selectedDate)
            })
            myArray = myArray.sort((activity1, activity2) => {
                const [hours1, minutes1] = activity1.Time.split(':').map(Number);
                const [hours2, minutes2] = activity2.Time.split(':').map(Number);
            
                if (hours1 !== hours2) {
                  return hours1 - hours2;
                }
            
                // If hours are equal, compare minutes
                return minutes1 - minutes2;
              });
            
            return myArray
    }
    async function settingData(){
        const myData = await gettingData()
        setUserLogs(transferTodaysLogs(myData,currentDate))
        setIsLoading(false)
    }
    async function gettingData(){
        const docRef = doc(db, "Users", "Danny");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          let data = docSnap.data()
          return data.logs
        }
    }
    const myLogs = transferTodaysLogs(myUser.logs, currentDate)
      useEffect(() =>{
        settingData()
      
       
    },[isLoading])

    if(!isLoading){
    return <div>
        <ul>
            {userLogs.map((log) =>{
                return <div>
                    <li>Activity: {log.Activity}</li>
                    <li>Time This is booked in: {log.Time}</li>
                    <li> Duration: {log.Duration} Minutes</li>
                    <button>Delete Entry</button>
                </div>
            })}
        </ul>
    </div>
    }else{
        return <div>
            <h3>Loading....</h3>
        </div>
    }
}