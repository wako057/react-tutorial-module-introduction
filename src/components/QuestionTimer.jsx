import { useState, useEffect } from "react";

const INTERVAL_DURATION = 100;

export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [ remainingTime, setRemainingTime] = useState(timeout);

    // console.log('timeout', timeout, 'remainingTime', remainingTime);

    useEffect(() => {
        console.log('SET TIMEOUT');
        const timer = setTimeout(() => {
            if (onTimeout) {
                onTimeout();
            }
            setRemainingTime(timeout);
        }, timeout);
        
        return () => (clearTimeout(timer));
    }, [timeout, onTimeout]);


    useEffect(() => {
        console.log('SET INTERVAL');
        const interval = setInterval(() => {
            console.log('setInterval', remainingTime);
            setRemainingTime(prevRemainingTime => prevRemainingTime - INTERVAL_DURATION)
        }, INTERVAL_DURATION);

        return () => {clearInterval(interval)};
    }, []);
        
    

    return (
        <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
    )
}