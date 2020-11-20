<<<<<<< HEAD
import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavItem, Nav, NavLink} from 'reactstrap';
import history from '../history';
import "../css/Header.css";
=======
import React from 'react';
import SignIn from "./SignIn";
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e

const Header = ({isSignedIn, signOut, username}) => {
  return (
    <div className='header'>

<<<<<<< HEAD
  isSignedIn() {
    let username = sessionStorage.getItem('user');
    return (username !== '' && username !== null);
  }

  signOut = () => {
    sessionStorage.removeItem('user');
    history.push('/sign-in');
    window.location.reload(false);
  };
=======
      <a href={'/home'} style={{textDecoration: 'none', color: 'black'}}>
        <h1 className='title'>Reddit SQL Clone</h1>
      </a>

        {isSignedIn() ? (
          <div style={{marginLeft: '470px', marginRight:'0', marginTop: '30px'}}>
            <a href={'/profile/' + username} style={{textDecoration: 'none', color: 'black'}}>
              <h3>{username}</h3>
            </a>
          </div>
        ) : (
          <div style={{marginLeft: '80px', marginRight:'0', marginTop: '35px'}}>
            <a href={'/create-account'} style={{ textDecoration: 'none', color: 'black'}}>
              <h3>Create Account</h3>
            </a>
          </div>
        )}
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e

      {isSignedIn() ? (
        <div className='right'>
          <a onClick={signOut} href={'/home'} style={{textDecoration: 'none', color: 'black'}}>
            <h3 style={{marginRight:'20px', marginTop: '30px'}}>Sign Out</h3>
          </a>
        </div>
      ) : (
        <div className='right'>
          <SignIn />
        </div>
      )}

    </div>
  );
};

export default Header;