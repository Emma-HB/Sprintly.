import React, { Component } from 'react';

export default class Access extends Component {
  render () {
    return (
      <div className="participant-section">
        <div>
          <p>Welcome on Sprintly, your favorite tool to share your business expectation ! 🎉🎉🎉</p>

          <form onSubmit={this.props.handleSubmit}>
            <div>
              <label>Session PIN: </label>
              <input 
                type="text"
                name="sessionPIN"
                value={this.props.sessionPIN}
                onChange={e => this.props.handleChange(e)}
              />              
              </div>
              <div>
                <label>Your Name: </label>
                <input 
                  type="text"
                  name="participant_name"
                  value={this.props.participant_name}
                  onChange={e => this.props.handleChange(e)}
                />              
              </div>
              <div>
                <label>Your Email: </label>
                <input 
                  type="text"
                  name="participant_email"
                  value={this.props.participant_email}
                  onChange={e => this.props.handleChange(e)}
                />              
              </div>
              <div>
                <div className="popin-buttons">
                  <input className="blue-btn" type="submit" value="Enter" />
                </div>
              </div>
          </form>
        </div>
      </div>
    )
  }
}
