import { useState } from "react"
import QUESTIONS from '../questions';

export default function Quiz() {  
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    function handleSelectedAnswer(selectedAnswer) {
        setUserAnswers(prevState => [...prevState, selectedAnswer]);
    }

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map(answer => (
                    <li key={answer} className="answer">
                        <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}