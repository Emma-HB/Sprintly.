import React, { Component } from 'react';
import Navbar from './Navbar';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar updateUser={this.props.updateUser}/>
        <p>Hi !</p>
      </div>
    )
  }
}

export default Dashboard;