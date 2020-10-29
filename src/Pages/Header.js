import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink} from 'reactstrap';
import history from '../history';
import "../css/Header.css";

class Header extends Component {

  isSignedIn() {
    let username = sessionStorage.getItem('user');
    return (username !== '' && username !== null);
  }

  signOut = () => {
    sessionStorage.removeItem('user');
    history.push('/sign-in');
    window.location.reload(false);
  };

  render() {

    if(this.isSignedIn()){
      return(
        <Navbar color="light" light expand="md">
          <NavbarBrand href='/home'><h1>Thiem Porter</h1></NavbarBrand>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink href="/profile">
                <h4>
                  Profile
                </h4>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.signOut}>
                <h4>
                  Sign Out
                </h4>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      );
    } else {
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

}

export default Header;