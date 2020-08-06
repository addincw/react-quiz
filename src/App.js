import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.css';
import AnswerOptions from './components/container/AnswerOptions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isFinish, setIsFinish] = useState(false);
  const [isRestart, setIsRestart] = useState(false);

  const handleSelectAnswer = answer => setCurrentAnswer(answer);
  const handleNextQuestion = () => {
    setAnswers([...answers, { indexQuestion: currentQuestion, answer: currentAnswer }]);
    setCurrentAnswer('');

    if (currentQuestion !== (questions.length - 1)) {
      setCurrentQuestion(currentQuestion + 1);
      return
    };

    handleCheckResult();
  }
  const handleCheckResult = () => {
    setIsFinish(true);

    // setQuestions([]);
    // setAnswers([]);
    // setCurrentQuestion(0);
    // setCurrentAnswer('');
  }
  const handleRestart = () => {
    setIsFinish(false);
    setIsRestart(!isRestart);
    setQuestions([]);
    setAnswers([]);
    setResults([]);
    setCurrentQuestion(0);
    setCurrentAnswer('');
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple')
      .then(response => response.json())
      .then(({ results }) => {
        const fetchedQuestions = results.map(({ question, correct_answer, incorrect_answers }) => {
          let answerOptions = incorrect_answers;
          answerOptions.splice(Math.floor(Math.random() * 4), 0, correct_answer);

          return {
            question,
            answerOptions,
            answerCorrect: correct_answer
          }
        });

        setQuestions(fetchedQuestions);

        if (isRestart) setIsRestart(!isRestart);
      })
  }, [isRestart]);

  useEffect(() => {
    const resultQuiz = answers.map(answer => {
      const question = questions[answer.indexQuestion]

      return {
        question: question.question,
        answer: answer.answer,
        is_correct: (answer.answer === question.answerCorrect)
      }
    })
    setResults(resultQuiz);
  }, [answers]);

  return (
    <div className="App">

      <section style={{ background: "whitesmoke", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: "50vw" }}>
          <div className="panel mb-3" style={{ display: isFinish ? 'block' : 'none' }}>
            <p className="panel-heading">
              Result:
            </p>
            {results.map((result, ir) => (
              <div className="panel-block" key={ir} style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <p>
                  <span className="has-text-weight-bold">{result.question}</span>
                  <br />
                  {result.answer}
                </p>

                <div className={"icon " + (result.is_correct ? 'has-text-success' : 'has-text-danger')}>
                  <i className={"fas " + (result.is_correct ? 'fa-check-circle' : 'fa-times-circle')}></i>
                </div>
              </div>
            ))}

            <div className="panel-block">
              <button
                className="button is-warning is-fullwidth mt-3"
                style={{ alignItems: "center" }}
                onClick={() => handleRestart()}>
                <span className="icon">
                  <i className="fas fa-sync-alt"></i>
                </span>
                <span>Restart quiz</span>
              </button>
            </div>
          </div>

          <div style={{ display: isFinish ? 'none' : 'block' }}>
            <p className="has-text-weight-bold mb-3">Question {currentQuestion + 1} of {questions.length}</p>

            <div className="box notification is-success is-light">
              {questions[currentQuestion] ? questions[currentQuestion].question : ''}
            </div>

            <AnswerOptions
              options={questions[currentQuestion] ? questions[currentQuestion].answerOptions : []}
              currentAnswer={currentAnswer}
              handleSelectAnswer={handleSelectAnswer}
            />

            <button
              className="button is-success is-fullwidth"
              style={{ alignItems: "center" }}
              onClick={() => handleNextQuestion()}
              disabled={currentAnswer === '' || currentQuestion === (questions.length - 1)}>
              <span>Confirm and Continue</span>
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
              </span>
            </button>

            {currentQuestion === (questions.length - 1) && <button
              className="button is-info is-fullwidth mt-3"
              style={{ alignItems: "center" }}
              onClick={() => handleNextQuestion()}
              disabled={currentAnswer === ''}>
              <span className="icon">
                <i className="fas fa-flag"></i>
              </span>
              <span>finish and check result</span>
            </button>}
          </div>
        </div>
      </section>


    </div>
  );
}

export default App;
