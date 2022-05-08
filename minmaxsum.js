'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr: number[]): void {
    // Write your code here
let minSum=getSum(arr,true)
let maxSum=getSum(arr,false)
console.log(minSum+" "+maxSum)
}
function getSum(arr:number[],isMinSum:boolean){
    let resultArr:number[]=[]
    for(let i=0; i<arr.length;i++){
        let subArr=arr.slice(0,i).concat(arr.slice(i+1))
        resultArr.push(subArr.reduce((x:number,y:number)=>x+y,0))
    }
    return isMinSum?Math.min(...resultArr):Math.max(...resultArr)
}

function main() {

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
