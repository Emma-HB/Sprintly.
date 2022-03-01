import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

class ViewStoryCard extends Component {

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

	componentDidMount(){
		this.getStoryCard();
	};

	render() {
			return (this.props.trigger) ? (
				<div className='popinEdit-background'>
					<div className='popinEdit-inner'>
						<h3>Story Card Details</h3>
						<form>
            <div className='storycard-epic storycard-item'>
              <label>Epic:</label>
              <p>{this.state.epic}</p>
            </div>
            <div className='storycard-summary storycard-item'>
              <label>Summary:</label>
							<p>{this.state.summary}</p>
            </div>
            <div className='storycard-externalid storycard-item'>
              <label>External ID:</label>
							<p>{this.state.external_id}</p>
            </div>
            <div className='storycard-description storycard-item'>
              <label>Description:</label>
							<p>{this.state.description}</p>
            </div>
            <div className='storycard-priorityAndStoryPoints'>
              <div className='storycard-priority storycard-item'>
                <label htmlFor='priority'>Priority:</label>
								<p>{this.state.priority}</p>
              </div>
              <div className='storycard-storypoints storycard-item'>
                <label>Story Points:</label>
								<p>{this.state.estimation}</p>
              </div>
            </div>
            <div className='storycard-status storycard-item'>
              <label>Status:</label>
							<p>{this.state.status}</p>
            </div>
            <div className='storycard-cta'>
              <button className='blue-btn'>Close</button>
            </div>
          </form>
						

					</div>            
				</div>
			) : "";
		}
    
};

    

export default ViewStoryCard;