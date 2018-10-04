import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { userActions } from '../_actions';

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
    				<a href="/">RidesShare</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
        <Navbar.Collapse>
          {!user && <Nav pullRight>
            <NavItem className="second" href="/register">Register</NavItem>
            <NavItem className="right" href="/login">Sign In</NavItem>
          </Nav>}
          {user && <Nav pullRight>
            <NavItem className="right" onClick={this.handleLogout}>Sign Out</NavItem>
          </Nav>}
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
