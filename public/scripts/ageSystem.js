function getYYYYMMDD(d){
    var dateString = d.getFullYear() +"-"+(d.getMonth()+ 1)+"-"+d.getDate();
    return dateString
}
function getAge(birthDate){
    var b = new Date(birthDate);
    var n = new Date();
    b=b.getTime();
    n=n.getTime();
    var timePassed = n-b;
    return calculateAgeMetric(timePassed);
}
function calculateAgeMetric(timeInMilliseconds){
    var timePassed = timeInMilliseconds;
    var minuteInMilliseconds = 60000;
    var hourInminutes = 60;
    var dayInHours = 24;
    var monthInDays = 30.5;
    var yearInMonths = 12;
    timePassed=timePassed/minuteInMilliseconds;

    if(timePassed<hourInminutes){
        return (timePassed).toFixed(1) + "Mins Old";
    }
    timePassed=timePassed/hourInminutes;
    if(timePassed<dayInHours){
        return (timePassed).toFixed(1) + "Hours Old";
    }
    timePassed=timePassed/dayInHours;
    if(timePassed<monthInDays){
        return (timePassed).toFixed(1) + "days Old";
    }
    timePassed=timePassed/monthInDays;
    if(timePassed<yearInMonths){
        return (timePassed).toFixed(1) + "months Old";
    }
    timePassed=timePassed/yearInMonths;
    return (timePassed).toFixed(1) + "years Old";
    
}

function calculateCyclesMissed(lastTime){
    var lastDate = new Date(lastTime)
    var nowDate = new Date ()
    lastDate=lastDate.getTime();
    nowDate=nowDate.getTime();
    var timePassed = nowDate-lastDate;
    var cyclesPassed = timePassed/(1000*60*6) // one every 10 minutes
    return cyclesPassed
}