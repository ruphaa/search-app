import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Search from './components/Search';
import Header from './components/Header';
import swal from 'sweetalert';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        uploadStatus: false
    }
    this.setUploadStatus = this.setUploadStatus.bind(this);
  }

  setUploadStatus(uploadStatus) {
    this.setState({
      uploadStatus
    });
  }

  render() {
    const { uploadStatus } = this.state;
    return (
      
      
          
          <div className="root-container">
            <FileUpload setUploadStatus={this.setUploadStatus} />
            {/* {
              uploadStatus ? <h2>Uploaded Successfully</h2> : null
            } */}
            {
              uploadStatus ? <Search /> : null
            }
        </div>
      
    );  
  }
}

export default App;
