import React, { Component } from 'react';
import { logout } from './auth/auth-service';
import { Link } from 'react-router-dom'; 

class Navbar extends Component {

  handleLogout = () => {
    logout()
      .then(() => {
        this.props.updateUser(false);
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