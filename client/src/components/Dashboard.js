import React, { Component } from 'react';
import Navbar from './Navbar';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
        <p>Hi !</p>
      </div>
    )
  }
}

export default Dashboard;