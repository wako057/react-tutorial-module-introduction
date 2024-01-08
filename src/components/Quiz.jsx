import { useCallback, useRef, useState } from "react";
import QUESTIONS from '../questions';
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {  
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizisComplete = QUESTIONS.length === activeQuestionIndex;

    const handleSelectedAnswer = useCallback(
        function handleSelectedAnswer(selectedAnswer) {
            setUserAnswers(prevState => [...prevState, selectedAnswer]);
        }, 
        []);
    

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizisComplete) {
        return (
            <Summary usersAnswers={userAnswers} />
        );
    }

    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectedAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}