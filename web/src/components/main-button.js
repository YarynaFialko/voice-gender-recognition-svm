import React from "react";
import "../styles/main-button.css";
import {useNavigate} from "react-router-dom";

function MainButton({content, onClick}) {
    const navigate = useNavigate();

    return (
        <div className="main-button">
            <button className="button" onClick={onClick}>
                {content}
            </button>
        </div>);

}

export default MainButton;