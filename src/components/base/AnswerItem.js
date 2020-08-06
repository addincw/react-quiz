import React, { useContext } from "react";
import { QuizContext } from "../../store/QuizContext";
import { SET_CURRENT_ANSWER } from "../../store/QuizActionTypes";

function AnswerItem({ order, answer, isSelected }) {
    const { dispatch } = useContext(QuizContext);

    const selectedStyle = isSelected ?
        {
            border: '1px solid #48c774',
            margin: '-1px'
        } : {};

    let icon = 'fa-circle-notch';
    switch (order) {
        case 'a':
            icon = 'fa-adobe';
            break;
        case 'b':
            icon = 'fa-bootstrap';
            break;
        case 'c':
            icon = 'fa-contao';
            break;
        case 'd':
            icon = 'fa-dailymotion';
            break;
        default:
            icon = 'fa-circle-notch';
            break;
    }

    const handleSelectAnswer = answer => dispatch({ type: SET_CURRENT_ANSWER, payload: answer });

    return (
        <div
            className="box box--answer"
            style={{ width: '100%', ...selectedStyle }}
            onClick={() => handleSelectAnswer(answer)}>
            <article className="media">
                <div className="media-left">
                    <div className={"icon is-large " + (isSelected ? 'has-text-success' : '')}>
                        <i className={"fab fa-3x " + icon}></i>
                    </div>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p> {answer} </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default AnswerItem;