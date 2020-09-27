import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink} from 'reactstrap';
import "./Header.css";

class Header extends Component {

  //navlinks and brands need href="/path/to/site"

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand><h1>Thiem Porter</h1></NavbarBrand>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href="/create-account">
              <h4>
                Create Account
              </h4>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/sign-in">
              <h4>
                Sign In
              </h4>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

}

export default Header;