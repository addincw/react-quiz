import React, { createContext, useReducer } from "react";
import QuizReducer from './QuizReducer';

export const QuizContext = createContext();
export const QuizProvider = (props) => {
    const initialState = {
        questions: [],
        answers: [],
        results: [],
        current_question: 0,
        current_answer: '',
        is_finish: false,
        is_restart: false
    };

    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {props.children}
        </QuizContext.Provider>
    )
}