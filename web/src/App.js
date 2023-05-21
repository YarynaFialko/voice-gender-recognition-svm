import './App.css';
import Header from './components/header.js'
import Footer from './components/footer.js'
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Predict from "./pages/predict";
import About from './pages/about';
import Team from './pages/team';
import Contact from './pages/contact';
import Main from './pages/main.js'
import Male from './pages/male.js'
import Female from './pages/female'
import { useLocation } from 'react-router-dom';

function App() {
    const [files, setFiles] = useState([]);
    const [isMale, setIsMale] = useState(false);

    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };


    return (
            <div className={`App`}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Predict/>} />
                        <Route path="/about" element={<About />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/male" element={<Male />} />
                        <Route path="/female" element={<Female />} />
                    </Routes>
                    <Footer/>
                </Router>
            </div>
        // </Router>
    );
}

export default App;
