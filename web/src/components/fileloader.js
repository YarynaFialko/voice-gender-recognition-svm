import React, { useState } from "react";
import "../styles/fileloader.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileLoader({onSuccess}) {

    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        const files = e.target.files;
        const allowedExtensions = [".mp3"];
        const selectedFiles = Array.from(files).filter((file) => {
            const fileName = file.name;
            const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
            return allowedExtensions.includes(fileExtension);
        });

        if (selectedFiles.length === 0) {
            toast.error('Invalid file format. Only .mp3 files are allowed.');
        } else {
            setFiles(selectedFiles);
            toast.success('Files selected successfully.');
            onSubmit(selectedFiles)
        }
    };

    const onSubmit = (selectedFiles) => {

        const data = new FormData();
        const fileNames = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            data.append("file", selectedFiles[i]);
            fileNames.push(selectedFiles[i].name);
        }

        axios.post('//localhost:8000/upload', data)
            .then((response) => {
                toast.success('Upload Success');
                onSuccess(fileNames[0])
            })
            .catch((e) => {
                console.log(e)
                toast.error('Upload Error')
            })
    };


    return (
        <div className="uploader">
                <div className="form-group files">
                    <p className="label">Drag and drop</p>
                    <img className="upload-icon" src={require("../img/folder-grey.png")} alt="folder image"/>
                    <input type="file"
                           id="file"
                           onChange={onInputChange}
                           className="inputfile"
                           multiple
                           accept=".mp3"/>
                    <label htmlFor="file">Choose a file</label>
                </div>
            <ToastContainer/>
        </div>
);
}

export default FileLoader;
