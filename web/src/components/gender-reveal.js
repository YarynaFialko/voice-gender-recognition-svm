import React from "react";
import "../styles/gender-reveal.css";

function GenderReveal({gender}) {

    return (
        <div className="reveal-main">
            <p className="reveal-label">Supposed gender:</p>
            <p className={`gender ${gender}`}>{gender}</p>
        </div>
    );
}

export default GenderReveal;
