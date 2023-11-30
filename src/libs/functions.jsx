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

