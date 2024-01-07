import { useCallback, useState } from "react"
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {  
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizisComplete = QUESTIONS.length === activeQuestionIndex;

    const handleSelectedAnswer = useCallback(function handleSelectedAnswer(selectedAnswer) {
        setUserAnswers(prevState => [...prevState, selectedAnswer]);
    }, []);
    

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizisComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon"/>
                <h2>Quiz Completed!</h2>
            </div>
        );
    }
    const shuffledAnswer = [ ...QUESTIONS[activeQuestionIndex].answers ].sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />

                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswer.map(answer => (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}