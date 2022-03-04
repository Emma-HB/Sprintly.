import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  state = {
    user: this.props.user
  }

  render() {
    return (
      <div className="homepage">
        <div className="homepage-section">
          <nav className="homepage-nav">
            <img className="sprintly-logo" src={'/assets/sprintly-logo.png'} alt="Sprintly."></img>
            <div className= "auth-btn-container">
              <Link  className="homepage-link participant-link" to={"/participant"}>Join a session</Link>
              {this.state.user  
                ? <Link className="homepage-link" to={"/dashboard"}>Login</Link>
                : <Link className="homepage-link" to={"/login"}>Login</Link>
              }
              <Link className="blue-btn" to={"/signup"}>Sign up</Link>
            </div>
          </nav>
          <div className="homepage-container">
            <div>
              <h2>Reworking the sucess of Backlog planning</h2>
                <Link className="blue-btn try-it-btn" to={"/signup"}>Try it now</Link>
            </div>
            <div className="empty-container-1">
              <img src={'/assets/Illustration Backlog.png'} alt='Sprintly Homepage Backlog' />
            </div>
          </div>
          <div className="master-container">
            <div className="empty-container-2">
              <img src={ '/assets/Illustration Sprint Planning.png' } alt='Sprintly Homepage Planning' />
            </div>
            <div className="features-container">
              <div className="features-subcontainer">
                <img className="backlog-icon" src={'/assets/backlog.png'} alt='backlog icon'/>
                <aside>
                  <h5>Manage holistic Backlog</h5>
                  <p>Gain a holistic view of all the feature ideas in your product backlog and confidently prioritize what to work next.</p>
                </aside>
              </div>
              <div className="features-subcontainer">
              <img className="stars-icon" src={'/assets/stars.png'} alt='stars icon'/>
              <aside>
                <h5>Validate feature ideas</h5>
                <p>Introduce and share your next best ideas. Keep stakeholders informed about all the functionality you’ve recently shipped and collect feedback to guide your next iteration.</p>
              </aside>
              </div>
              <div className="features-subcontainer">
              <img className="prio-icon" src={'/assets/prio-icon.png'} alt='prio icon'/>
              <aside>
                <h5>Prioritize with Agile roadmapping</h5>
                <p>In an Agile world, plans may change, but you’ll want ti aim for a North Star to keep your team productive and aligned. What you want is to remain agile, tactically revising your delivery strategy with the commitment and alignement of your business stakeholders.</p>
              </aside>
              </div>
              <div className="features-subcontainer">
              <img className="sprint-icon" src={'/assets/calendar-icon.png'} alt='sprint icon'/>
              <aside>
                <h5>Run business oriented Sprint planning sessions</h5>
                <p>Collectively orchestrate and push prioritized features into development Sprints, taking into consideration build effort and delivery windows recurrence.</p>
              </aside>
              </div>
            </div>
          </div>
          <div className="empty-container-3">
            <a href='/participant'><img className="empty-container-3-link" src={'assets/Join Your Sprintly Session.png'} alt=''/></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage;