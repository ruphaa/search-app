import React, { Component } from 'react';
import axios from 'axios';
import './FileUpload.css';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false,
            fileName: 'No file chosen'
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.setUploadStatus = this.setUploadStatus.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    setUploadStatus(uploadStatus) {
        const { setUploadStatus: parentUploadStatus } = this.props;
        this.setState({ uploadStatus});
        parentUploadStatus(uploadStatus);
    }

    updateFileName(event) {
        event.preventDefault();
        const fileName = this.uploadInput && this.uploadInput.files && this.uploadInput.files.length && this.uploadInput.files[0] && this.uploadInput.files[0].name;
        if(fileName){
            this.setState({
                fileName: this.uploadInput.files[0].name
            });
        }
    }

    handleUpload(event) {
        event.preventDefault();
        
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        axios.post('http://localhost:4444/upload-file', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            this.setUploadStatus(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    resetState(){
        this.setState({
            fileName: 'No file chosen'
        });
        this.setUploadStatus(false);
    }
    
    render() {
        return (
            
            <div className="container">
                <form className="file-form" onSubmit={this.handleUpload}>
                    <i className="fa fa-refresh" onClick={this.resetState}></i>
                    <div className="file-upload">
                        <div className="file-select">
                            <div className="file-select-button" id="fileName">Choose File</div>
                            <div className="file-select-name" id="noFile">{ this.state.fileName }</div> 
                            <input type="file" name="chooseFile" id="chooseFile" ref={(ref) => { this.uploadInput=ref; }} onChange={(e) => this.updateFileName(e)}/>
                        </div>
                        <button className="file-upload-button" id="fileName">Upload</button>
                    </div>
                </form>
                {/* {
                    this.state.uploadStatus ? (
                        <h2>Uploaded successfully</h2>
                    ) : (
                        <h2></h2>
                    )} */}
            </div>
            
        );
    }
}

export default FileUpload;