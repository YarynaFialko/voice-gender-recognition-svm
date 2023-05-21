import React from 'react';
import FileLoader from "../components/fileloader";
import MainButton from "../components/main-button";
import '../styles/main-button.css';
import '../styles/fileloader.css';

// import '../styles/female.css';

function Female() {
    return (
        <div className='female-main'>
            <FileLoader />
            <MainButton content="Return" to="/"/>
        </div>
    );
}

export default Female;
