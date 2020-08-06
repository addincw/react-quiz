import {
    SET_QUESTIONS,
    SET_ANSWERS,
    SET_RESULTS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_IS_FINISH,
    SET_IS_RESTART,
    RESTART
} from "./QuizActionTypes";

export default (state, action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case SET_ANSWERS:
            return { ...state, answers: [...state.answers, action.payload] };
        case SET_RESULTS:
            return { ...state, results: action.payload };
        case SET_CURRENT_QUESTION:
            return { ...state, current_question: action.payload };
        case SET_CURRENT_ANSWER:
            return { ...state, current_answer: action.payload };
        case SET_IS_FINISH:
            return { ...state, is_finish: action.payload };
        case SET_IS_RESTART:
            return { ...state, is_restart: action.payload };
        case RESTART:
            return {
                is_finish: false,
                is_restart: !state.is_restart,
                questions: [],
                answers: [],
                results: [],
                current_question: 0,
                current_answer: '',
            };

        default:
            return state;
    }
}