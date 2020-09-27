import React, {Component} from 'react';

import {Navbar, NavbarBrand, NavLink, NavItem, Nav} from 'reactstrap';
import {View} from 'react-native';
import "./Header.css";

class Header extends Component {

  //navlinks and brands need href="/path/to/site"

  render() {
    return (
      <View>

      <Navbar color="light" light expand="md">
        <View className='left'>
          <NavbarBrand><h1>Thiem Porter</h1></NavbarBrand>
        </View>
        <Nav navbar>
          <NavItem>
            <NavLink>
              <h4>
                Create Account
              </h4>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <h4>
                Sign In
              </h4>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      </View>
    );
  }

}

export default Header;