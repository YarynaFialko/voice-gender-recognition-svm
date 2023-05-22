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
import { useLocation } from 'react-router';

function App() {
     const [files, setFiles] = useState([]);
    const [isMale, setIsMale] = useState(false);
    const [isFemale, setIsFemale] = useState(false);

    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

    let appClassName = " ";
    // if (isMale && !isFemale) {
    //     appClassName += " male-app";
    // } else if (!isMale && isFemale) {
    //     appClassName += " female-app";
    // } else {
    //     appClassName += " App";
    // }




    return (
            <div className={appClassName}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Predict setIsMale={setIsMale} setIsFemale={setIsFemale}/>} />
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
