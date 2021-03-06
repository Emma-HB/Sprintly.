import React, { Component } from 'react';
import './Backlog.css'; 

import Navbar from '../Navbar';


class StoryCardImport extends Component {

  state = {
    file : "",
    setFile: ""
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleFormSubmit = (event) => {
    const data = new FormData();
    data.append("file", this.file);
    console.log("Submit event successfully passed")
  };

  render() {
    return(
      <div className='full-page'>
        <Navbar updateUser={this.props.updateUser} history={this.props.history}/>
        <div className="import-background">
          <div className='import-page-inner'>
            <h3>CSV file upload</h3>
            <p>To import Story Cards in bulk, you need to provide the data in a CSV file format.</p>
            <p>Please use this <a href='/'>formatted CSV file</a> template.</p>
            <form encType="multipart/form-data">
              <div className='storycard-item'>
                <label htmlFor='selectFile'>CSV source file</label>
                <input type='file' accept='.csv' id='selectFile' name="file" onChange={event => {
                  this.handleChange = event.target.files[0]; 
                  this.State.setFile(this.State.file);
                }}/>
              </div>
              <div className='storycard-cta'>
                <button className='blue-btn' onClick={this.handleFormSubmit}>Upload</button>
                <button className='grey-btn'>Cancel</button>
              </div>
            </form>
          </div>    
        </div>
      </div>
    )
  }
}

export default StoryCardImport;

