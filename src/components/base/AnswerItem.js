import React from "react";

function AnswerItem({ order, answer, isSelected, handleSelectAnswer }) {
    let icon = 'fa-circle-notch';
    const selectedStyle = isSelected ?
        {
            border: '1px solid #48c774',
            margin: '-1px'
        } : {}

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