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
      (this.state.prioritizations.length > 0 ) 
      ? <ul className="prio-list-container">
          {this.state.prioritizations.map((el, index) => {
            const date = new Date(el.createdAt).toLocaleDateString();
            return (
              <li key={`${el.sessionPIN}-${index}`} className={"prio-list"}>
                <p className="title-container">
                  <p> {el.project_id.title}   |</p>
                  <Link to={`/prioritizations/${el._id}`} className="link"><h3>Priorization {index + 1}</h3></Link>
                  <p>of {date}</p>
                </p>
                <p className="session-pin">PIN: {el.sessionPIN}</p>
                <button className="blue-btn">Export Results<img className="export-icon"src={'/assets/export-logo.png'} alt="export" /></button>
              </li>
            )
          })}
        </ul>
      : <ul className="prio-list-container">
          <li className={"prio-list empty-prio"}>No prioritization</li>
        </ul>
    )
  }
}

export default Prioritizations;