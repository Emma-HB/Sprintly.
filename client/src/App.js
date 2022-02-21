import './App.css';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; 

import Homepage from './components/Homepage';
import Signup from './components/auth/Signup'; 
import Login from './components/auth/Login';
import { loggedin } from './components/auth/auth-service';
import Dashboard from './components/dashboard/Dashboard';
import Backlog from '../src/components/backlog/Backlog';
import NewStoryCard from './components/backlog/NewStorycards'
import ParticipantPages from './components/participant/ParticipantPages';

class App extends Component {
  state = { 
    user: {}
   }

  fetchUser = () => {
    if (!this.state.user._id) {
      loggedin()
          .then(data => {
            console.log(data)
            this.setState({user: data})
          })
          .catch(err => this.setState({user: false}))
    } else {
      console.log('user already in the state')
    }
  }
  
  componentDidMount() {
    this.fetchUser();
  }
 
  updateLoggedInUser = (userObj) => {
    this.setState({
      user: userObj
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Switch>
          <Route exact path='/' render={(props) => <Homepage user={this.state.user} />} />
          <Route exact path='/signup' render={(props) => (<Signup updateUser={this.updateLoggedInUser} history={props.history} />)} />
          <Route exact path='/login' render={(props) => (<Login updateUser={this.updateLoggedInUser} history={props.history} />)} />
          <Route exact path='/dashboard' render={(props) => (<Dashboard updateUser={this.updateLoggedInUser} history={props.history} />)}/>
          <Route exact path='/projects/:id' render={(props) => (<Backlog updateUser={this.updateLoggedInUser} history={props.history} />)}/>
          <Route exact path='/storycards/new' render={(props) => (<NewStoryCard updateUser={this.updateLoggedInUser} history={props.history} />)}/>
          <Route exact path='/participant/prioritization' render={(props) => (<ParticipantPages history={props.history} />)}/>
        </Switch>
      </div>
    );
  }  
}

export default App;
