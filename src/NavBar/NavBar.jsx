import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { userActions } from '../_actions';
import './navbar.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(userActions.logout());
    history.push('/');
  }

  render(){
    const { user } = this.props;
    return (
      <Navbar collapseOnSelect>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">Rides <FAI icon="car" /> Share</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
        <Navbar.Collapse>
          {!user && <Nav pullRight>
            <NavItem className="second" href="/register">Register</NavItem>
            <NavItem className="right" href="/login">Sign In</NavItem>
          </Nav>}
          {user && <div><Nav>
            <NavItem className="left" href="/dashboard">Dashboard</NavItem>
            <NavItem className="second" href="/riding">Riding</NavItem>
            <NavItem className="third" href="/sharing">Sharing</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem className="second" href="/dashboard">Hello, {user.firstname}</NavItem>
            <NavItem className="right" onClick={this.handleLogout}>Sign Out</NavItem>
          </Nav></div>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar };
