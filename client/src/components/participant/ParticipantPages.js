import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Prioritization from './Prioritization';
import Access from './Access';

class ParticipantPages extends Component {
  state = {
    sessionPIN: "",
    participant_name: "",
    participant_email: "",
    prioSessionId: "",
    errorMessage: ""
  }

  //To update prioSession with participant infos
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const sessionPIN = this.state.sessionPIN;
    const participant_name = this.state.participant_name;
    const participant_email = this.state.participant_email;

    service.put(('/prioritizations/participate'), {sessionPIN, participant_email, participant_name})
      .then( (response) => {
        this.setState({
          prioSessionId: response.data.prioSessionFromPIN._id,
          errorMessage: ""
        })
      })
      .catch(err =>  this.setState({errorMessage: err.response.data.errorMessage}) )
  }

  render () {
    return (
      <div className="participant">
        <nav>
          <img src="" alt="Sprintly." />
        </nav>
        
        {!this.state.prioSessionId 
        ? <Access
          handleSubmit={this.handleSubmit}
          sessionPIN={this.state.sessionPIN}
          participant_name={this.state.participant_name}
          participant_email={this.state.participant_email}
          handleChange={this.handleChange}
          errorMessage={this.state.errorMessage}
        />
        : (<DndProvider backend={HTML5Backend}>
            <Prioritization 
              prioSessionId={this.state.prioSessionId}
              participant_email={this.state.participant_email}
            />
          </DndProvider>
        )}      
      </div>
    )
  }
}

export default ParticipantPages;