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
            file: ""
        }

        this.apiUrl = "http://localhost:8080";
        this.handlePredict = this.handlePredict.bind(this);
    }

    async handlePredict(event) {
        // event.preventDefault();
        try {
            const url = `${this.apiUrl}/predict?file=${this.state.file}`;
            fetch(url)
                .then(res => res.json())
                .then(res => this.setState({
                    path: this.state.path,
                    n: this.state.n,
                    resultTrain: res,
                }));
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className='about-main'>
                <FileLoader />
                <MainButton content={"Predict"} />
            </div>
        );
    }
}

export default Predict;
