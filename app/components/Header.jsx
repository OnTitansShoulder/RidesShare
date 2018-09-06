import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  render(){
    return (
      <Navbar collapseOnSelect>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">RidesShare</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="second" href="/register">Register</NavItem>
            <NavItem className="right" href="/signin">Sign In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
