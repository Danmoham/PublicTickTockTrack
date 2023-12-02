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
    
    // Convert the hour to a number
    let hourNum = parseInt(hour, 10);

    // Determine whether it's AM or PM
    const period = hourNum < 12 ? 'AM' : 'PM';

    // Adjust the hour for 12-hour format
    hourNum = hourNum % 12 || 12;

    // Format the result
    const time12 = `${hourNum}:${minute} ${period}`;

    return time12;
}