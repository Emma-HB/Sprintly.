import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service  from '../auth/auth-service'; 

class Projects extends Component {

  state = {
    projects: []
  }
  
  //To display the list of projects
  getAllProjects = () => {
    service.get('/projects')
    .then(response => {
      this.setState({
        projects: response.data
      })
    })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <ul>
        <li><button className="add-project-btn" onClick={e => this.props.addNewProject()}>+</button></li>

        {this.state.projects.map((el) => {
          return (
            <li key={`${el.title}-${el.description}`}>
              <h3>{el.title}</h3>
              <p>{el.description}</p>
              <hr></hr>
              <Link to={`/projects/${el._id}`}>View</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Projects;