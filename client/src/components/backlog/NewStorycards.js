import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

const queryString = require('query-string');


class NewStorycard extends Component {
  state = { 
      projectID: "",
      epic: "", 
      summary: "", 
      external_id: "",
      description: "", 
      priority: "",
      estimation: "",
      status: "",
      sprint_label: ""
  };

  handleFormSubmit = (event) => {
    const parsedProjectID = queryString.parse(this.props.history.location.search);

    event.preventDefault();
    const project_id = parsedProjectID.projectid; 
    const epic = this.state.epic;
    const summary = this.state.summary;
    const external_id = this.state.external_id;
    const description = this.state.description;
    const priority = this.state.priority;
    const estimation = this.state.estimation;
    const status = this.state.status;
    const sprint_label = this.state.sprint_label;

    service.post(("/storycards"), { 
      project_id, 
      epic, 
      summary, 
      external_id, 
      description, 
      priority, 
      estimation, 
      status, 
      sprint_label
    })
    .then( () => {
      console.log("Regarder this.props", project_id)
    })
    .catch( error => console.log(error) )
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  render() {
    return(
      <div className='popin-background'>
        <div className='new-storycard-popin'>
          <h3>Create Story Card</h3>
          <form onSubmit={this.handleFormSubmit}>
            <div className='storycard-epic storycard-item'>
              <label>Epic:</label>
              <input type="text" name="epic" value={this.state.epic} onChange={ e => this.handleChange(e)}/>
            </div>
            <div className='storycard-summary storycard-item'>
              <label>Summary:</label>
              <input type="text" name="summary" value={this.state.summary} onChange={ e => this.handleChange(e)}/>
            </div>
            <div className='storycard-externalid storycard-item'>
              <label>External ID:</label>
              <input type="text" name="external_id" value={this.state.external_id} onChange={ e => this.handleChange(e)}/>
            </div>
            <div className='storycard-description storycard-item'>
              <label>Description:</label>
              <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
            </div>
            <div className='storycard-priorityAndStoryPoints'>
              <div className='storycard-priority storycard-item'>
                <label htmlFor='priority'>Priority:</label>
                <select name="priority" id="priority" value={this.state.priority} onChange={ e => this.handleChange(e)}>
                  <option value="select">--Select option</option>
                  <option value="highest">Highest</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="lowest">Lowest</option>
                </select>
              </div>
              <div className='storycard-storypoints storycard-item'>
                <label>Story Points:</label>
                <input type="number" name="estimation" value={this.state.estimation} onChange={ e => this.handleChange(e)}/>
              </div>
            </div>
            <div className='storycard-status storycard-item'>
              <label>Status:</label>
              <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
            </div>
            <div className='storycard-cta'>
              <input className='blue-btn' type="submit" value="Add Story Card" />
              <button className='grey-btn'>Cancel</button>
            </div>
          </form>
        </div>            
      </div>
    )
  }
};

export default NewStorycard;