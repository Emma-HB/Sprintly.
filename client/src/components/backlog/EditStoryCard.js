import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

class EditStoryCard extends Component {

  state = {
    epic: this.props.epic, 
    summary: this.props.summary,
  }

  handleCancel = (event) => {
    let cancelPath = `${this.props.history.location.pathname}`;
  }

  handleFormSubmit = (event) => {
    const epic = this.state.epic;
    const summary = this.state.epic;

    event.preventDefault();

    service.put((`/storycards/${this.props._id}`), { epic, summary })
    .then( (storyCardFromDB) => {
      console.log("Regarder les props", this.props )
      console.log("Regarder la storyCard", storyCardFromDB )
    })
    .catch( error => console.log(error) )
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };


    render() {
      return (this.props.trigger) ? (
        <div className='popinEdit-background'>
          <div className='popinEdit-inner'>
            <h3>Edit Story Card</h3>
            <form onSubmit={this.handleFormSubmit}>
              
              <label>Epic:</label>
              <input type="text" name="epic" value={this.state.epic} onChange={e => this.handleChange(e)}/>
              <label>Summary:</label>
              <input type="text" name="summary" value={this.state.summary} onChange={e => this.handleChange(e)}/>
              
              <div className='storycard-cta'>
                <input className='blue-btn' type="submit" value="Update Story Card" />
                <button className='grey-btn' onClick={this.handleCancel}>Cancel</button>
              </div>
            </form>


          </div>            
        </div>
      ) : "";
    }
}

export default EditStoryCard;