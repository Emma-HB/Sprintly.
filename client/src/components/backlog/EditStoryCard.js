import React, { Component } from 'react';
import service  from '../auth/auth-service'; 


class EditStoryCard extends Component {

	state = { 
		project_id: "",
		epic: "", 
		summary: "", 
		external_id: "",
		description: "", 
		priority: "",
		estimation: "",
		status: "",
		sprint_label: ""
};

  getStoryCard = () => {
    service.get(`/storycards/${this.props.storycardID}`)
    .then( (storyCardFromDB) => {
      console.log("Regarder storyCardFromDB", storyCardFromDB )
    
      const theStoryCard = storyCardFromDB.data;
      this.setState(theStoryCard);
    })
    .catch((err)=>{
        console.log('Error while fetching Story Card', err)
      })
  }

  handleFormSubmit = (event) => {

    event.preventDefault();
    const epic = this.state.epic;
    const summary = this.state.summary;
    const external_id = this.state.external_id;
    const description = this.state.description;
    const priority = this.state.priority;
    const estimation = this.state.estimation;
    const status = this.state.status

    service.put((`/storycards/${this.props.storycardID}`), { epic, summary, external_id, description, priority, estimation, status })
    .then( (storyCardFromDB) => {
      window.location.reload(false);
    })
    .catch( error => console.log(error) )
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  componentDidMount(){
    this.getStoryCard();
  };

    render() {
      return (this.props.trigger) ? (
        <div className='popinCard-background'>
          <div className='popinCard-inner'>
            <h3>Edit Story Card</h3>
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
                  <option value="Highest">Highest</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Lowest">Lowest</option>
                </select>
              </div>
              <div className='storycard-storypoints storycard-item'>
                <label>Story Points:</label>
                <input type="number" name="estimation" value={this.state.estimation} onChange={ e => this.handleChange(e)}/>
              </div>
              <div className='storycard-status storycard-item'>
              <label>Status:</label>
              <input type="text" name="status" value={this.state.status} onChange={ e => this.handleChange(e)}/>
            </div>
            </div>
            
            <div className='storycard-cta'>
              <input className='blue-btn' type="submit" value="Update Story Card" />
              <button className='grey-btn' onClick={e => this.props.hideEditPopin(-1)}>Cancel</button>
            </div>
          </form>

          </div>            
        </div>
      ) : "";
    }
}

export default EditStoryCard;