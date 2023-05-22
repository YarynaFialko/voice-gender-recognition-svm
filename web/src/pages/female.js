import React, { useEffect } from 'react';
import GenderReveal from "../components/gender-reveal"
import MainButton from "../components/main-button";
import '../styles/main-button.css';
import '../styles/fileloader.css';
import '../styles/female.css';

function Female() {
    const onClick = () => {
        window.location.href = "/";

    };

    useEffect(() => {
        document.body.classList.add('female-app');
    }, []);

    return (
        <div className='main-female'>
            <GenderReveal gender={"female"} />
            <MainButton content="Return" onClick={onClick}/>
            <div className={"appear"}></div>
        </div>
    );
}

export default Female;
