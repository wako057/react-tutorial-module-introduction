import { useState, useEffect } from "react";

const INTERVAL_DURATION = 1000;

export default function QuestionTimer({ timeout, onTimeout }) {
    const [ remainingTime, setRemainingTime] = useState(timeout);

    // console.log('timeout', timeout, 'remainingTime', remainingTime);

    useEffect(() => {
        console.log('SET TIMEOUT');
        setTimeout(() => {
            onTimeout();
            setRemainingTime(timeout);
        }, timeout);
    }, [timeout, onTimeout]);


    useEffect(() => {
        console.log('SET INTERVAL');
        setInterval(() => {
            // console.log('setInterval', remainingTime);
            setRemainingTime(prevRemainingTime => prevRemainingTime - INTERVAL_DURATION)
        }, INTERVAL_DURATION);
    }, []);
        
    

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    )
}