import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink} from 'reactstrap';
import history from '../history';

class Header extends Component {

  isSignedIn() {
    let username = sessionStorage.getItem('username');
    return (username !== '' && username !== null);
  }

  signOut = () => {
    sessionStorage.removeItem('username');
    history.push('/sign-in');
    window.location.reload(false);
  };

  render() {

    if(this.isSignedIn()){
      return(
        <div className='header'>
          <Navbar light expand="md">
            <NavbarBrand href='/home'><h1>Thiem Porter</h1></NavbarBrand>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href="/profile">
                  <h4>
                    {sessionStorage.getItem('username')}
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
        </div>
      );
    } else {
      return (
        <div className='header'>
          <Navbar light expand="md">
            <NavbarBrand  href='/sign-in'><h1>Thiem Porter</h1></NavbarBrand>
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
        </div>
      );
    }
  }

}

export default Header;