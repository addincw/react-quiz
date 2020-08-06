import React, { useState, useEffect, useReducer } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import rootReducer from './store/reducer';

import './App.css';
import AnswerOptions from './components/container/AnswerOptions';
import { SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_QUESTIONS, SET_ANSWERS, RESTART, SET_IS_RESTART, SET_IS_FINISH, SET_RESULTS } from './store/actionTypes';

function App() {
  const initialState = {
    questions: [],
    answers: [],
    results: [],
    current_question: 0,
    current_answer: '',
    is_finish: false,
    is_restart: false
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const {
    questions,
    answers,
    results,
    current_question,
    current_answer,
    is_finish,
    is_restart,
  } = state;

  const handleSelectAnswer = answer => dispatch({ type: SET_CURRENT_ANSWER, payload: answer });
  const handleNextQuestion = () => {
    dispatch({ type: SET_ANSWERS, payload: { indexQuestion: current_question, answer: current_answer } });
    dispatch({ type: SET_CURRENT_ANSWER, payload: '' });

    if (current_question !== (questions.length - 1)) {
      dispatch({ type: SET_CURRENT_QUESTION, payload: (current_question + 1) });
      return
    };

    dispatch({ type: SET_IS_FINISH, payload: true });
  }
  const handleRestart = () => dispatch({ type: RESTART });


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

        dispatch({ type: SET_QUESTIONS, payload: fetchedQuestions });

        if (is_restart) dispatch({ type: SET_IS_RESTART, payload: !is_restart });
      })
  }, [is_restart]);

  useEffect(() => {
    const resultQuiz = answers.map(answer => {
      const question = questions[answer.indexQuestion]

      return {
        question: question.question,
        answer: answer.answer,
        is_correct: (answer.answer === question.answerCorrect)
      }
    })
    dispatch({ type: SET_RESULTS, payload: resultQuiz });
  }, [answers]);

  return (
    <div className="App">

      <section style={{ background: "whitesmoke", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ width: "50vw" }}>
          <div className="panel mb-3" style={{ display: is_finish ? 'block' : 'none' }}>
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

          <div style={{ display: is_finish ? 'none' : 'block' }}>
            <p className="has-text-weight-bold mb-3">Question {current_question + 1} of {questions.length}</p>

            <div className="box notification is-success is-light">
              {questions[current_question] ? questions[current_question].question : ''}
            </div>

            <AnswerOptions
              options={questions[current_question] ? questions[current_question].answerOptions : []}
              currentAnswer={current_answer}
              handleSelectAnswer={handleSelectAnswer}
            />

            <button
              className="button is-success is-fullwidth"
              style={{ alignItems: "center" }}
              onClick={() => handleNextQuestion()}
              disabled={current_answer === '' || current_question === (questions.length - 1)}>
              <span>Confirm and Continue</span>
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
              </span>
            </button>

            {current_question === (questions.length - 1) && <button
              className="button is-info is-fullwidth mt-3"
              style={{ alignItems: "center" }}
              onClick={() => handleNextQuestion()}
              disabled={current_answer === ''}>
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
