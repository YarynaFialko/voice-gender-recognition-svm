import React from "react";
import "../styles/main-button.css";
import {useNavigate} from "react-router-dom";

function MainButton({content}) {
    const navigate = useNavigate();

    const onClick = () => {
        if (content === "Predict") {
            navigate('/female');
        } else if (content === "Return") {
            navigate('/');
        }
    };


    return (
        <div className="main-button">
            <button className="button" onClick={onClick}>
                {content}
            </button>
        </div>);

}

export default MainButton;