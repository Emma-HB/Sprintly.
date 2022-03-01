import React, { Component } from 'react';
import './Dashboard.css'; 
import {loggedin} from '../auth/auth-service';
import Navbar from '../Navbar';
import Projects from './Projects';
import NewProject from './NewProject';
import Prioritizations from './Prioritizations';
import Homepage from '../Homepage';

class Dashboard extends Component {

  state = {
    user: this.props.updateUser,
    username: '',
    showPopin: false,
    showProjects: true,
    showPrios: false
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

  displayProjects = () => {
    this.setState({
      showProjects: true,
      showPrios: false
    })
  }

  displayPrios = () => {
    this.setState({
      showProjects: false,
      showPrios: true
    })
  }

  render() {
    return (
      (this.state.username) ?
      <div className="dashboard">
        <Navbar updateUser={this.props.updateUser} history={this.props.history}/>

        <div className="dashboard-section">
          
          <div className="left-menu">
            <h1>{this.state.username}</h1>
            <button className='left-menu-link' onClick={(e) => {this.displayProjects(e)}}><img className="left-menu-icon" src={'/assets/allprojects-icon.png'} alt="logout icon"/><h2>All Projects</h2></button>

            <button className='left-menu-link' onClick={(e) => {this.displayPrios(e)}}><img className="left-menu-icon" src={'/assets/allprioritization-icon.png'} alt="logout icon"/><h2>All Prioritizations</h2></button>
          </div>
          
          <aside className="list">
            { this.state.showProjects && 
              <Projects addNewProject={this.handleNewProject} />}
          </aside>

          <aside>
            {this.state.showPrios && 
              <Prioritizations />}
          </aside>

          { this.state.showPopin && <NewProject  getData={() => this.getAllProjects()} hidePopin={this.handleNewProject} history={this.props.history}/> }

        </div>
      </div>

      : <Homepage />
    )
  }
}

export default Dashboard;