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
        <Navbar updateUser={this.props.updateUser} history={this.props.history}/>
        <div className='full-page'>
          <div className='full-page-inner '>
            <img src={ '/assets/Illustration Prioritization.png' } alt='Illustration Prioritization'/>
            <aside>
              <p>Your session will happen here:</p>
              <h5>https://sprintly-io.herokuapp.com/participant</h5>
              {this.state.listOfPrioritizations.map( prioritization => {
                return(
                  <div key={prioritization._id}>
                  <h3 >Session PIN: {prioritization.sessionPIN}</h3>
                  </div>
                )
              })}
              <p className="extra-space">🎉🎉🎉 Enjoy Prioritization with Sprintly.🎉🎉🎉</p>
              <a className="blue-btn" href='/dashboard'>Back to Dashboard</a>
            </aside>
          </div>
        </div>
      </div>
    )
  }
};

export default NewPrioritization;