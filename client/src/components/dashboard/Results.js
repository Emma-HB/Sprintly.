import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service  from '../auth/auth-service';
import './Results.css'; 

import Navbar from '../Navbar'

export default class Results extends Component {

  state = {
    prioritization: {},
    date: "",
    results: [],

    participant_name: "",
    participant_prio: [],
    participant_SC: []
  }
  
  //To display the list of projects
  getPrioritizationDetails = () => {
    service.get(`/prioritizations/${this.props.match.params.id}`)
    .then(response => {
      console.log(response.data)
      console.log(response.data.prioStoryCard)

      this.setState({
        prioritization: response.data,
        date: new Date(response.data.createdAt).toLocaleDateString(),
        results: response.data.prioStoryCard
      })
    })
  }

  componentDidMount() {
    this.getPrioritizationDetails();
  }

  getParticipantResult = (event) => {
    console.log(event.target.value)
    const participantResults = this.state.results.find(el => el.participant_name === event.target.value);

    const participant_SC_copy = [];
    participantResults.participant_prio.forEach(item => {
      let storycardInfo = this.state.prioritization.selectedStoryCard.find(el => el._id === item) 
      participant_SC_copy.push(storycardInfo)
    })

    this.setState({
      participant_name: event.target.value,
      participant_prio: participantResults.participant_prio,
      participant_SC: participant_SC_copy
    })
  }

  handleSubmit = () => {
    console.log('Export CSV')
  }
  
  render() {
    return (
      <>
        <Navbar updateUser={this.props.updateUser} history={this.props.history}/>

        <div className="participant result">
          <div className="participant-section result">
            <div className="prioritization-container">
              <div className="drag-column participants-list">
                <div className="results-title">
                  <Link className="menu-link" to={'/dashboard'}><img className="menu-icon" src={'/assets/back-icon.png'} alt="menu-icon"/></Link>
                  <h3>Prioritization of {this.state.date}</h3>
                  <div>
                    <button className='export-results-btn blue-btn' onClick={() => this.handleSubmit()}>Export results<img className="export-results-icon"src={'/assets/export-logo.png'} alt="export" /></button>
                  </div>
                </div>
                  <div className="participant-number">
                    <div>{this.state.results.length}</div>
                    <p>Users who entered prioritization session</p>
                  </div>

                {this.state.results.map((el, index) => {
                  return (                    
                    <button className="participant-result-link" onClick={(e) => {this.getParticipantResult(e)}} type="submit" value={`${el.participant_name}`}><img src={'/assets/user-logo.png'} alt="participant-icon" /><p>{el.participant_name}</p></button>           
                  )
                })}
              </div>
              <div className="drop-column-results">
                  {this.state.participant_SC.map(el => {
                    return (
                      <div>
                        <div className="draggable-container results">
                            <div>
                              <h3>{el.summary}</h3>
                            </div>
                            <div className="infos-SC-wrapper">
                              <div>
                                <p className="epic">Epic: <span>{el.epic}</span></p>
                                <div className="infos-SC">
                                  <p>Priority: <span>{el.priority}</span></p>
                                  <p>Estimation: <span>{el.estimation}</span></p>
                                </div>
                              </div>
                              <h4>ID: {el.external_id}</h4>                            
                            </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
