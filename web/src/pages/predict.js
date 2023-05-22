import React, {Component} from 'react';
import FileLoader from '../components/fileloader.js'
import MainButton from '../components/main-button.js'
// import '../styles/main-button.css';
// import '../styles/fileloader.css';
import '../styles/loading.css';

class Predict extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMale: false,
            file: "",
            result: "",
            isLoading: false
        }

        this.apiUrl = "http://localhost:8080";
        this.handlePredict = this.handlePredict.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange = (filename) => {
        this.setState({ file: filename });
    };

    componentDidMount() {
        document.body.classList.add('App');
    }

    handlePredict = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        console.log('file: ', this.state.file);
        try {
            console.log('sending request');
            const url = `${this.apiUrl}/predict?file=./server/public/${this.state.file}`;
            console.log('url: ', url);
            const response = await fetch(url);

            // HERE the loading starts
            const data = await response.json();
            const result = data.output[0].split(':')[1].trim(); // Extract the result value
            console.log(result);
            this.setState({ result: result});

            if (result === 'male') {
                window.location.href = '/male';
                this.props.setIsMale(true);
                this.props.setIsFemale(false);
            } else if (result === 'female') {
                window.location.href = '/female';
                this.props.setIsMale(false);
                this.props.setIsFemale(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <div className='about-main'>
                <FileLoader onSuccess={this.handleFileChange}  />
                <MainButton content={"Predict"} onClick={this.handlePredict} />
                {this.state.isLoading && (
                    <div className="loader-container">
                        <div className="lds-hourglass"></div>
                    </div>
                )}
            </div>
        );
    }
}

export default Predict;
