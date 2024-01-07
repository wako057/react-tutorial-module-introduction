import { useState, useEffect } from "react";

const INTERVAL_DURATION = 100;

export default function QuestionTimer({ timeout, onTimeout }) {
    const [ remainingTime, setRemainingTime] = useState(timeout);

    console.log('timeout', timeout, 'remainingTime', remainingTime);

    useEffect(() => {
        setTimeout(() => {
            onTimeout();
            setRemainingTime(timeout);
        }, timeout);
    }, [timeout, onTimeout]);


    useEffect(() => {
        setInterval(() => {
            console.log('setInterval', remainingTime);
            setRemainingTime(prevRemainingTime => prevRemainingTime - INTERVAL_DURATION)
        }, INTERVAL_DURATION);
    }, []);
        
    

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    )
}