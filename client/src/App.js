import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 

import Homepage from './components/Homepage';
import Signup from './components/auth/Signup'; 
import Login from './components/auth/Login';
import { loggedin } from './components/auth/auth-service';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  state = { loggedInUser: null }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false})
        })
    }
  }
  
  componentDidMount() {
    this.fetchUser();
  }
 
  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path='/signup' render={() => ( this.state.loggedInUser ? (<Redirect to="/dashboard" /> ) : (<Signup updateUser={this.updateLoggedInUser}/>))}/>
          <Route exact path='/login' render={() => ( this.state.loggedInUser ? (<Redirect to="/dashboard" /> ) : (<Login updateUser={this.updateLoggedInUser}/>))}/>
          <Route exact path='/dashboard' render={() => ( !this.state.loggedInUser ? (<Redirect to="/" /> ) : (<Dashboard updateUser={this.updateLoggedInUser}/>))}/>
        </Switch>
      </div>
    );
  }  
}

export default App;
