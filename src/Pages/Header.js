import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink} from 'reactstrap';
import SignIn from "./SignIn";
import history from '../history';

class Header extends Component {

  signOut = () => {
    sessionStorage.removeItem('username');
    history.push('/home');
    window.location.reload(false);
  };

  render() {

    return (
      <div className='header'>
        <Navbar light expand="md">
          <NavbarBrand href='/home'><h1>Reddit SQL Clone</h1></NavbarBrand>
          <Nav className='ml-auto' navbar>
            <NavItem>
              {this.props.isSignedIn
                ?
                <NavLink href="/profile">
                  <h4>
                    {sessionStorage.getItem('username')}
                  </h4>
                </NavLink>
                :
                <NavLink href="/create-account">
                  <h4>
                    Create Account
                  </h4>
                </NavLink>
              }
            </NavItem>
            <NavItem>
              {this.props.isSignedIn
                ?
                <NavLink href="/home" onClick={this.signOut}>
                  <h4>
                    Sign Out
                  </h4>
                </NavLink>
                :
                <div>
                  <SignIn />
                </div>
              }
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }

}

export default Header;