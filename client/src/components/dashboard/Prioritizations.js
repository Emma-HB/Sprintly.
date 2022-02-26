import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import service  from '../auth/auth-service'; 

class Prioritizations extends Component {

  state = {
    prioritizations: []
  }
  
  //To display the list of projects
  getAllPrioritizations = () => {
    service.get('/prioritizations')
    .then(response => {
      console.log(response.data)
      this.setState({
        prioritizations: response.data
      })
    })
  }

  componentDidMount() {
    this.getAllPrioritizations();
  }

  render() {
    return (
      <ul>
        {this.state.prioritizations.map((el, index) => {
          const date = new Date(el.createdAt).toLocaleDateString();
          return (
            <li key={`${el.sessionPIN}-${index}`}>
              <p>{date}</p>
              <Link to={`/prioritizations/${el._id}`}><h3>Priorization {index + 1}</h3></Link>
              <p>{el.project_id.title}</p>
              <p>{el.sessionPIN}</p>
              <button>Export Results</button>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Prioritizations;