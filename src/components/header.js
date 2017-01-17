import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  authorized() {
    if (this.props.authenticated) {
      // return <button onClick={() => this.props.authenticate(false)}>Sign Out</button>
      return  <li className="nav-item">
        <Link to="/signout" className="nav-link">Sign Out</Link>
      </li>
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
      ]
    }
    // return <button>Toogle Auth </button>;
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {/* <li className="nav-item">
            <Link to="/">Home</Link>
          </li> */}
          { this.authorized() }
          <li className="nav-item">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="nav-item">
            <Link to="/users">Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/feature">Feature</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}
export default connect(mapStateToProps, actions)(Header)
