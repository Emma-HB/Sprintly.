import React, { Component } from 'react';
import service  from '../auth/auth-service'; 

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

    service.post(('/projects'), { title, description})
      .then( () => {
        this.props.getData();
        // this.setState({title: '', description: ''});
        // this.history.push('/projects/:id')
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render() {
    return (
      <div className="popin-background">
        <div className="new-project-popin">
          <h4>Create New project</h4>
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
                <div className="popin-buttons">
                  <input className="blue-btn" type="submit" value="Create" />
                  <div className="grey-btn" onClick={e => this.props.hidePopin()}>Cancel</div>
                </div>
              </div>
          </form>
        </div>
      </div>
    )
  }
}

export default NewProject;