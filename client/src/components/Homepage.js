import React, { Component } from 'react';

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="homepage-section">
          <nav>
            <img alt="Sprintly."></img>
            <p>Log in</p>
            <button className="blue-btn">Sign up</button>
          </nav>
          <div className="homepage-container">
            <div>
              <h2>Reworking the sucess of Backlog planning</h2>
              <button className="blue-btn try-it-btn">Try it now</button>
            </div>
            <div className="empty-container-1"></div>
          </div>
          <div className="empty-container-2"></div>
          <div className="empty-container-3"></div>
        </div>
      </div>
    )
  }
}

export default Homepage;