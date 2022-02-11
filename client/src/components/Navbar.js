import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img alt="Sprintly."></img>
        <img className="logout-icon" src={'/assets/Logout.png'} alt="logout icon"/>
      </div>
    )
  }
}

export default Navbar;