export function isTaken (Time,array){
    let isThisFalsy = false
    let [myhours, myMinutes] = Time.split(':').map(Number);
    myhours = myhours * 60
    const myFinalTime = myhours + myMinutes
    array.forEach(element => {
        let [elementHours, elementMinutes] = element.time.split(':').map(Number);
        elementHours = elementHours * 60
        const elementTime = elementHours + elementMinutes
        if (elementTime === myFinalTime){
            isThisFalsy = true
        }else if ((elementTime < myFinalTime) && (elementTime + parseInt(element.duration) > myFinalTime)){
            isThisFalsy = true
        }
    });
    return isThisFalsy
}

export function convertMinutesToTime(totalMinutes) {

    let myMinutes = 1440 -  parseInt(totalMinutes)
    const hours = Math.floor(myMinutes / 60);
    const minutes = myMinutes % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }
export function convertMinutesToListTime(myMinutes){
    const hours = Math.floor(myMinutes / 60);
    const minutes = myMinutes % 60;  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
}

export function convertTimeToMinutes(Time){
    let [hours,minutes] = Time.split(":").map(Number)
    hours = hours * 60 
    return hours + minutes

}

export function isViable (time,array){
    array.forEach(element => {
        let [elementHours, elementMinutes] = element.time.split(':').map(Number);
        elementHours = elementHours * 60
        const elementTime = elementHours + elementMinutes
        if (elementTime === myFinalTime){
            isThisFalsy = true
        }else if ((elementTime < myFinalTime) && (elementTime + parseInt(element.duration) > myFinalTime)){
            isThisFalsy = true
        }
    });
    return isThisFalsy
}

export  function generateTimeArray() {
    const times = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        times.push(`${formattedHours}:${formattedMinutes}`);
      }
    }
    return times;
  }

  export function checkingSubmitTime(Time,duration,array){
    let isThisFalsy = false
    let [myhours, myMinutes] = Time.split(':').map(Number);
    myhours = myhours * 60
    const myFinalTime = myhours + myMinutes
    array.forEach(element => {
        let [elementHours, elementMinutes] = element.time.split(':').map(Number);
        elementHours = elementHours * 60
        const elementTime = elementHours + elementMinutes
        if (elementTime === myFinalTime){
            isThisFalsy = true
        }else if ((elementTime > myFinalTime) && (myFinalTime + duration > elementTime)){
            isThisFalsy = true
        }
    });
    return isThisFalsy
  }
  export function convertTo12HourFormat(time24) {
    // Parse the input time string
    const [hour, minute] = time24.split(':');
    let hourNum = parseInt(hour, 10);
    const period = hourNum < 12 ? 'AM' : 'PM';
    hourNum = hourNum % 12 || 12;

    const time12 = `${hourNum}:${minute} ${period}`;

    return time12;
}
export function transferTodaysLogs(array,selectedDate){
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

