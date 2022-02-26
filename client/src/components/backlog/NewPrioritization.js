import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

import Navbar from '../Navbar';

import './Backlog.css'; 

class NewPrioritization extends Component {

  state = {
    listOfPrioritizations : []
  }

  getSessionPIN = () => {
    service.get(`/prioritizations/exact?id=${this.props.match.params.id}`)

    .then(prioSessionFromDB => {
      console.log('Réponse', prioSessionFromDB)
      this.setState({
        listOfPrioritizations: prioSessionFromDB.data
      })
    })
    .catch( error => console.log(error) )
  }

  componentDidMount() {
    this.getSessionPIN();
    }
  
  
  render() {
    return(
      <div>
      <Navbar />
        <div className='new-storycard-popin'>
          <section>
            <p>The session will happen here:</p>
            <h5>https://sprintly-io.herokuapp.com/participant</h5>
            {this.state.listOfPrioritizations.map( prioritization => {
              return(
                <div key={prioritization._id}>
                <h3 >Session PIN: {prioritization.sessionPIN}</h3>
                </div>
              )
            })}
          
            <p>🎉🎉🎉Happy Prioritization🎉🎉🎉</p>
          </section>
        </div>
      </div>
  )
  }
};

export default NewPrioritization;