import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Summary({ usersAnswers }) {
    const skippedAnswers = usersAnswers.filter(answer => answer === null);
    const correctAnswer = usersAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    const skippedAnswersShare = Math.round(
        (skippedAnswers.length / usersAnswers.length) * 100
    );
    const correctAnswersShare = Math.round(
        (correctAnswer.length / usersAnswers.length) * 100
    );

    const wrongAnswerShare = 100 - correctAnswersShare - skippedAnswersShare

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Trophy Icon"/>
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersShare}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">Answer correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswerShare}%</span>
                    <span className="text">Answered Incorrectly</span>
                </p>
            </div>
            <ol>
                {usersAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';
                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }

                    return (
                    <li key={index}>
                        <h3>{index + 1}</h3>
                        <p className="question">{QUESTIONS[index].text}</p>
                        <p className={cssClass}>{answer ?? 'Skipped'}</p>
                    </li>
    
                    );
                })}
            </ol>
        </div>
    );
}