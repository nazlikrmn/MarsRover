'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function (inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function (): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s: string): string {
    // Write your code here
    let timeArr = s.split(":")
    timeArr.push(timeArr[2].substr(2))
    timeArr[2] = timeArr[2].substr(0, 2)
    let hour = parseInt(timeArr[0])
    let isAm = timeArr[3].toLowerCase() == "am" ? true : false;
    if (isAm && hour < 12) {
        return timeArr.slice(0, 3).join(":")
    } else if (isAm && hour == 12) {
        return "00:" + timeArr.slice(1, 3).join(":")
    } else if (!isAm && hour == 12) {
        return timeArr.slice(0, 3).join(":")
    }else{
        return hour+12+":"+ timeArr.slice(1, 3).join(":")
    }
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}
