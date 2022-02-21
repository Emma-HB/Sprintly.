import React, { Component } from 'react';
import './Dashboard.css'; 
import {loggedin} from '../auth/auth-service';
import Navbar from '../Navbar';
import Projects from './Projects';
import NewProject from './NewProject';

class Dashboard extends Component {

  state = {
    username: '',
    showPopin: false
  }

  //To display username on the dashboard
  fetchUsername() {
    loggedin()
      .then(response => {
        this.setState({username: response.username})
      })
      .catch((err) => console.log("error", err))
  }
  
  componentDidMount() {
    this.fetchUsername();
  }

  handleNewProject = () => {
    this.setState({showPopin: !this.state.showPopin})
  }

  render() {
    return (
      <div className="dashboard">
        <Navbar updateUser={this.props.updateUser} history={this.props.history}/>

        <div className="dashboard-section">
          
          <div className="left-menu">
            <h1>{this.state.username}</h1>
            <button className='left-menu-link' onClick={e => this.getAllProjects()}><img className="left-menu-icon" src={'/assets/Logout.png'} alt="logout icon"/><h2>All Projects</h2></button>
          </div>
          
          <aside className="list">
            <Projects addNewProject={this.handleNewProject} />
          </aside>

          { this.state.showPopin && <NewProject  getData={() => this.getAllProjects()} hidePopin={this.handleNewProject} history={this.props.history}/> }

        </div>
      </div>
    )
  }
}

export default Dashboard;