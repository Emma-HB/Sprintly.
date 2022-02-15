import React, { Component } from 'react';
import axios from 'axios';

import './Backlog.css'; 

class Storycards extends Component {

  constructor(props){
    super(props);
    this.state = { 
      project_id: "",
      epic: "", 
      summary: "", 
      externalID: "",
      description: "", 
      priority: "",
      storyPoints: "",
      status: "",
      sprint_label: "",
      isShowing: false };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const projectID = this.props.Project._id; 
    const epic = this.state.epic;
    const summary = this.state.summary;
    const externalID = this.state.externalID;
    const description = this.state.description;
    const priority = this.state.priority;
    const storyPoints = this.state.storyPoints;
    const status = this.state.status;
    const sprint_label = this.state.sprint_label;


    axios.post("http://localhost:5005/api/storycards", { 
      projectID, 
      epic, 
      summary, 
      externalID, 
      description, 
      priority, 
      storyPoints, 
      status, 
      sprint_label
     })
    .then( () => {
        this.props.getTheProject();
        this.setState({
          epic: "", 
          summary: "",
          externalID: "", 
          description: "",
          priority: "",
          storyPoints: "",
          status: "",
          sprint_label: ""
        });
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

showAddStoryCardForm = () => {
  if(this.state.isShowing){
      return(
          <div>
                <h3>Create Story Card</h3>
                <form onSubmit={this.handleFormSubmit}>
                  <label>Epic:</label>
                  <input type="text" name="epic" value={this.state.epic} onChange={ e => this.handleChange(e)}/>
                  <label>Summary:</label>
                  <input type="text" name="summary" value={this.state.summary} onChange={ e => this.handleChange(e)}/>
                  <label>External ID:</label>
                  <input type="text" name="externalID" value={this.state.externalID} onChange={ e => this.handleChange(e)}/>
                  <label>Description:</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  <label htmlFor='priority'>Priority:</label>
                  <select name="priority" id="priority" value={this.state.priority} onChange={ e => this.handleChange(e)}>
                    <option value="highest">Highest</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="lowest">Lowest</option>
                  </select>
                  <label>Story Points:</label>
                  <input type="number" name="storyPoints" value={this.state.storyPoints} onChange={ e => this.handleChange(e)}/>
                  <label>Status:</label>
                  <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
                  
                  <button className='blue-btn'>Add Story Card</button>
                  <button className='grey-btn'>Cancel</button>

                </form>
          </div>
        )
  }
}  

  render(){
    return(
      <div>
        <h3>Create Story Card</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Epic:</label>
          <input type="text" name="epic" value={this.state.epic} onChange={ e => this.handleChange(e)}/>
          <label>Summary:</label>
          <input type="text" name="summary" value={this.state.summary} onChange={ e => this.handleChange(e)}/>
          <label>External ID:</label>
          <input type="text" name="externalID" value={this.state.externalID} onChange={ e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
          <label htmlFor='priority'>Priority:</label>
          <select name="priority" id="priority" value={this.state.priority} onChange={ e => this.handleChange(e)}>
            <option value="highest">Highest</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="lowest">Lowest</option>
          </select>
          <label>Story Points:</label>
          <input type="number" name="storyPoints" value={this.state.storyPoints} onChange={ e => this.handleChange(e)}/>
          <label>Status:</label>
          <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
          
          <button className='blue-btn' onClick={() => this.toggleForm()}> Add Story Card </button>
          <button className='grey-btn'>Cancel</button>
        </form>
                        
      </div>
    )
  }
}

export default Storycards;