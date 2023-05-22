import React, {Component} from 'react';
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
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange = (filename) => {
        this.setState({ file: filename });
    };


    handlePredict = async (event) => {
        event.preventDefault();

        console.log('file: ', this.state.file);
        try {
            console.log('sending request');
            const url = `${this.apiUrl}/predict?file=./server/public/${this.state.file}`;
            console.log('url: ', url);
            const response = await fetch(url);
            const data = await response.json();
            const result = data.output[0].split(':')[1].trim(); // Extract the result value
            console.log(result);
            this.setState({ result: result});


            if (result === 'male') {
                window.location.href = '/male';
            } else if (result === 'female') {
                window.location.href = '/female';
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className='about-main'>
                <FileLoader onSuccess={this.handleFileChange}  />
                <MainButton content={"Predict"} onClick={this.handlePredict} />
            </div>
        );
    }
}

export default Predict;
