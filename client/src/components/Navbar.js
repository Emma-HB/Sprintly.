import React, { Component } from 'react';
import { logout } from './auth/auth-service';
import { Link } from 'react-router-dom'; 

class Navbar extends Component {

  handleLogout = (event) => {
    logout()
      .then(() => {
        this.props.updateUser(false);
        this.props.history.push('/')
      })
      .catch(err => console.log('error', err))
  }

  render() {
    return (
      <div className="navbar">
        <Link to={"/"}><img alt="Sprintly."></img></Link>
        <button className='logout-btn' onClick={this.handleLogout}><img className="logout-icon" src={'/assets/Logout.png'} alt="logout icon"/></button>
      </div>
    )
  }
}

export default Navbar;