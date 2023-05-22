import React from 'react';
import MainButton from "../components/main-button";
// import '../styles/male.css';

function Male() {
    const onClick = () => {
        window.location.href = "/";
    };

    return (
        <div className='about-main'>
            <MainButton content="Return" onClick={onClick}/>
        </div>
    );
}

export default Male;
