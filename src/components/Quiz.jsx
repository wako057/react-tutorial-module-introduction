import { useCallback, useRef, useState } from "react"
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from "./Question";

export default function Quiz() {  
    const [ answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizisComplete = QUESTIONS.length === activeQuestionIndex;

    const handleSelectedAnswer = useCallback(
        function handleSelectedAnswer(selectedAnswer) {
            setAnswerState('answered');
            setUserAnswers(prevState => [...prevState, selectedAnswer]);

            const timeout = setTimeout(() => {
                if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                    setAnswerState('correct')
                } else {
                    setAnswerState('wrong');
                }
                const timeout = setTimeout(() => {
                    setAnswerState('');
                }, 2000);
            }, 1000);
        }, 
        [activeQuestionIndex]);
    

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizisComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon"/>
                <h2>Quiz Completed!</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectedAnswer}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}