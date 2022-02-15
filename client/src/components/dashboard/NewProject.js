import React, { Component } from 'react';
import axios from 'axios';

class NewProject extends Component {

  state = {
    title: '',
    description: ''
  }
  
  //To add a new project
  handleSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;

    const service = axios.create({
      baseURL: 'http://localhost:5005/api',
      withCredentials: true
    });

    service.post(('/projects'), { title, description})
      .then( () => {
          this.setState({title: '', description: ''});
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render() {
    return (
      <div className="new-project-popin">
        <h2>Create New project</h2>
          <form onSubmit={this.handleSubmit}>
              <div>
                <label>Name: </label>
                <input 
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={e => this.handleChange(e)}
                />              
              </div>

              <div>
                <label>Description: </label>
                <textarea 
                  name="description"
                  value={this.state.description}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div>
                <input type="submit" value="Submit" />
                <button>Cancel</button>
              </div>
          </form>
      </div>
    )
  }
}

export default NewProject;