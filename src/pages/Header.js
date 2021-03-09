import React from 'react';
import SignIn from "./SignIn";

const Header = ({isSignedIn, signOut, username}) => {
  return (
    <div className='header'>

      <div className='title-box'>
        <a href={'/home'} style={{textDecoration: 'none', color: 'black'}}>
          <p className='title'>Reddit SQL Clone</p>
        </a>
      </div>

      <div className='header-area'>

        {isSignedIn() ? (
          <a href={'/profile/' + username} style={{height: 'fit-content', textDecoration: 'none', color: 'black'}}>
            <p className='link-item'>{username}</p>
          </a>

        ) : (

          <a href={'/create-account'} style={{ textDecoration: 'none', color: 'black', height: 'fit-content'}}>
            <p className='link-item'>Create Account</p>
          </a>
        )}

        {isSignedIn() ? (
          <div>
            <a onClick={signOut} href={'/home'} style={{textDecoration: 'none', color: 'black'}}>
              <p className='link-item'>Sign Out</p>
            </a>
          </div>
        ) : (
          <SignIn />
        )}

      </div>

    </div>
  );
};

export default Header;