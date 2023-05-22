import React, {useEffect} from 'react';
import MainButton from "../components/main-button";
import GenderReveal from "../components/gender-reveal"
import '../styles/female.css';

function Male() {
    const onClick = () => {
        window.location.href = "/";
    };

    useEffect(() => {
        document.body.classList.add('male-app');
    }, []);


    return (
        <div className='about-main'>
            <GenderReveal gender={"male"}/>
            <MainButton content="Return" onClick={onClick}/>
            <div className={"appear"}></div>
        </div>
    );
}

export default Male;
