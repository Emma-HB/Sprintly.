import React, { Component } from 'react';
import { login } from './auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { email: '', password: '', errorMessage: ''}

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    login(email, password)
      .then(response => {
        this.setState({ email: "", password: "", errorMessage: ""});
        this.props.updateUser(response);
        this.props.history.push('/dashboard');
      })
      .catch(err =>  this.setState({errorMessage: err.response.data.errorMessage}) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div className="auth-wrapper">
        <div className="auth-container">
          <img src={'/assets/sprintly-logo.png'} alt="Sprintly."/>
          <form onSubmit={this.handleFormSubmit}>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} placeholder="Your email"/>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} placeholder="Your password"/>
            <aside>
            <Link className="auth-aside-link" to={"/"}>Forgot password?</Link>
            </aside>
            <button className="blue-btn auth-btn">Log in</button>
          </form>

          {this.state.errorMessage && (
            <p className="auth-error">{this.state.errorMessage}</p>
          )}

          <p className="auth-redirect">Need an account? 
            <Link className="auth-redirect-link" to={"/signup"}>Sign up</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default Login;