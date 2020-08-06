import React from "react";
import AnswerItem from "../base/AnswerItem";

function AnswerOptions({ options, currentAnswer }) {
    const orders = ['a', 'b', 'c', 'd'];

    return (
        <div className="columns" style={{ flexWrap: "wrap" }}>
            {options.map((answer, i) => (
                <div key={i} className="column is-6">
                    <AnswerItem
                        order={orders.shift()}
                        answer={answer}
                        isSelected={currentAnswer === answer}
                    />
                </div>
            ))}
        </div>

    )
}

export default AnswerOptions;