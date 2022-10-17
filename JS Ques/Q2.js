
/*
d Given a time in 12-hr AM/PM format, convert it to military time(24hr) and you also need to add 45
min &45 sec in the result and the display the output.
E.g.: - Input – 12:01:00PM Output 12:46:45
Input – 12:01:00AM Output 00:46:45
*/


function timeConversion(s) {
    const ampm = s.slice(-2);
    const hours = Number(s.slice(0, 2));
    let time = s.slice(0, -2);
    if (ampm === 'AM') {
        if (hours === 12) { 
            return  time.replace(s.slice(0, 2), '00');
        }
        return time;
    } else if (ampm === 'PM') {
        if (hours !== 12) {
            return time.replace(s.slice(0, 2), String(hours + 12));
        } 
        return time; 
    }
    return 'Format Of time is not valid';
}

function addTimes(times) {

    const z = (n) => (n < 10 ? '0' : '') + n;

    let hour = 0
    let minute = 0
    let second = 0
    for (const time of times) {
        const splited = time.split(':');
        hour += parseInt(splited[0]);
        minute += parseInt(splited[1])
        second += parseInt(splited[2])
    }
    const seconds = second % 60
    const minutes = parseInt(minute % 60) + parseInt(second / 60)
    const hours = hour + parseInt(minute / 60)

    return z(hours) + ':' + z(minutes) + ':' + z(seconds)
}

let s1 ='12:01:00AM'
var times =['00:45:45']
times.push(timeConversion(s1));
console.log(addTimes(times));