import React, { Component } from 'react';
import { signup } from './auth-service';
import { Link } from 'react-router-dom';
import './Auth.css'; 


class Signup extends Component {

  state = { username: '', email: '', password: '', errorMessage: ''}

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
  
    signup(username, password, email)
      .then(response => {
        this.setState({username: "", email: "", password: "", errorMessage: ""});
        this.props.updateUser(response);
        this.props.history.push('/dashboard');
      })
      .catch(err =>  this.setState({errorMessage: err.response.data.errorMessage}) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          <img src={'/assets/sprintly-logo.png'} alt="Sprintly."/>
          <form onSubmit={this.handleFormSubmit}>
            <label>Name:</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} placeholder="Your name" />
            <label>Email:</label>
            <input name="email" value={this.state.email} onChange={e => this.handleChange(e)} placeholder="Your email" />
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} placeholder="Your password" />
            <button className="blue-btn auth-btn" >Sign up</button>
          </form>

          {this.state.errorMessage && (
            <p className="auth-error">{this.state.errorMessage}</p>
          )}
  
          <p className="auth-redirect">Already a user? 
            <Link className="auth-redirect-link" to={"/login"}>Login</Link>
          </p>
        </div>      
      </div>
    )
  }
}

export default Signup;
