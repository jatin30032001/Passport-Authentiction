
/*
1st Given an array of bird where every element represents a bird type id, determine the ids of the most
frequently and least frequently sighted type. If more than 1 type has been spotted that maximum
amount, return the smallest of their ids & If more than 1 type has been spotted that minimum amount,
return the smallest of their ids.
E.g.: - Input – [1,1,2,2,4,4,4,4,5] Output – [4, 5]
Input – [2,2,2,2,4,4,4,4,5] Output – [2, 5]
Input – [1,2,2,4,4,4,4,5] Output – [4, 1]
*/

function Frequencies(arr){
    const freqTable = [];
    for(let i=0; i < arr.length; i++){
        const id = arr[i];
        freqTable[id] = freqTable[id] ? freqTable[id] + 1 : 1;
    }
    return freqTable;
}

function maximum(arr) {
    const freq = Frequencies(arr);
    let maxFreq = 0, min= 0;
    
    const ids = Object.keys(freq);
    for(let i = 0; i < ids.length; i++){
       const id = ids[i];
       if(freq[id] > maxFreq){
            maxFreq = freq[id];
            min = id;
       }else if(freq[id] === maxFreq){
           min = Math.min(min, id);
       }     
    }
    return min;
}

function minimum(arr) {
    const freq = Frequencies(arr);
    let minFreq = 11, minID= 0;
    
    const ids = Object.keys(freq);
    for(let i = 0; i < ids.length; i++){
       const id = ids[i];
       if(freq[id] < minFreq){
            minFreq = freq[id];
            minID = id;
       }else if(freq[id] === minFreq){
        minID = Math.min( minID, id);
       }     
    }
    return  minID;
}

var arr1 = [1,2,2,4,4,4,4,5];
var Final1 =[];
Final1.push(maximum(arr1));
Final1.push( minimum(arr1));
console.log(Final1)


var arr2 = [1,1,2,2,4,4,4,4,5];
var Final2 =[];
Final2.push(maximum(arr2));
Final2.push( minimum(arr2));
console.log(Final2)


var arr3 = [2,2,2,2,4,4,4,4,5];
var Final3 =[];
Final3.push(maximum(arr3));
Final3.push( minimum(arr3));
console.log(Final3)
