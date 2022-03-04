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
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    return (
      <ul>
        <li className="add-new-project"><button className="add-project-btn" onClick={e => this.props.addNewProject()}>+</button></li>

        {this.state.projects.map((el) => {
          return (
            <li className="project-container"key={`${el.title}-${el.description}`}>
              <h3>{el.title}</h3>
              <div>
                <p>{el.description}</p>
              </div>
              <button className="blue-btn"><Link className="project-link"to={`/projects/${el._id}`}>View</Link></button>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Projects;