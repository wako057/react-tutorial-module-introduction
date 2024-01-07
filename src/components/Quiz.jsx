import { useCallback, useState } from "react"
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer";

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
    const shuffledAnswer = [ ...QUESTIONS[activeQuestionIndex].answers ].sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />

                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswer.map(answer => {
                        const isSelected = userAnswers[userAnswers.length -1] === answer;
                        let cssClasses = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected';
                        }

                        if (['wrong', 'correct'].includes(answerState) && isSelected) {
                            cssClasses = answerState;
                        }
                        return (
                            <li key={answer} className="answer">
                                <button 
                                onClick={() => handleSelectedAnswer(answer)} 
                                className={cssClasses}>
                                    {answer}
                                </button>
                            </li>
                            );
                    })}
                </ul>
            </div>
        </div>
    );
}