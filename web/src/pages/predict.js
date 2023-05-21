import React, {Component, useState} from 'react';
import FileLoader from '../components/fileloader.js'
import MainButton from '../components/main-button.js'
import '../styles/main-button.css';
import '../styles/fileloader.css';


class Predict extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMale: false,
            file: "",
            result: ""
        }

        this.apiUrl = "http://localhost:8080";
        this.handlePredict = this.handlePredict.bind(this);
    }

    handleFileChange = (filename) => {
        this.setState({ file: filename });
    };

    async handlePredict(event) {
        event.preventDefault();
        try {
            const url = `${this.apiUrl}/predict?file=${this.state.file}`;
            fetch(url)
                .then(res => res.json())
                .then(res => this.setState({result: res.output[0]}));
            console.log(this.state.result);
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return (
            <div className='about-main'>
                <FileLoader onSuccess={this.handleFileChange} />
                <MainButton content={"Predict"} />
                <button> predict</button>
            </div>
        );
    }
}

export default Predict;
