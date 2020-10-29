import React from 'react';
import SignIn from "./SignIn";

const Header = ({isSignedIn, signOut, username}) => {
  return (
    <div className='header'>

      <a href={'/home'} style={{textDecoration: 'none', color: 'black'}}>
        <h1 className='title'>Reddit SQL Clone</h1>
      </a>

        {isSignedIn() ? (
          <div style={{marginLeft: '470px', marginRight:'0', marginTop: '30px'}}>
            <a href={'/profile'} style={{textDecoration: 'none', color: 'black'}}>
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