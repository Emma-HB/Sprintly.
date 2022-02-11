import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="homepage-section">
          <nav>
            <img alt="Sprintly."></img>
            <Link className="homepage-link" to={"/login"}>Login</Link>
            <Link className="blue-btn" to={"/signup"}>Sign up</Link>
          </nav>
          <div className="homepage-container">
            <div>
              <h2>Reworking the sucess of Backlog planning</h2>
                <Link className="blue-btn try-it-btn" to={"/signup"}>Try it now</Link>
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