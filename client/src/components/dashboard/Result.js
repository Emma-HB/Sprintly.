import React, { Component } from 'react';
import service  from '../auth/auth-service';

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
      console.log(response.data.prioStoryCard[14].participant_prio)

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
        <Navbar />

        <div className="participant">
          <div className="participant-section">

            <div><button className='prioritization-submit blue-btn' onClick={() => this.handleSubmit()}>Export results</button></div>

            <div className="prioritization-container">
              <div className="drag-column">
                <div>
                  <div>Participants results</div>
                  <div>Prioritization of {this.state.date}</div>
                </div>
                {this.state.results.map((el, index) => {
                  return (
                    <div>
                    <button onClick={(e) => {this.getParticipantResult(e)}} type="submit" value={`${el.participant_name}`}>{el.participant_name}</button>
                    </div>
                  )
                })}
              </div>
              <div className="drop-column">
                  {this.state.participant_SC.map(el => {
                    return (
                      <div>
                        <div className="draggable-container">
                            <p>{el.summary}</p>
                            <p>{el.epic}</p>
                            <p>{el.priority}</p>
                            <p>{el.estimation}</p>
                            <p>{el.external_id}</p>
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
