<<<<<<< HEAD
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './css/App.css';
=======
import React, {Component} from "react";
import {Router, Switch, Route} from "react-router-dom";
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e
import CreateAccount from "./Pages/CreateAccount";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import Profile from "./Pages/Profile";
import history from './history';
import './styles/style.css';

import 'bootstrap/dist/css/bootstrap.css';

<<<<<<< HEAD
//Function to check if the user is logged in
//Returns true if username is found in session storage, false if not
function isSignedIn() {
  let user = sessionStorage.getItem('user');
  return (user !== '' && user !== null);
}
=======
class App extends Component {

  //Function to check if the user is logged in
  //Returns true if username is found in session storage, false if not
  isSignedIn = () => {
    let username = sessionStorage.getItem('username');
    return (username !== '' && username !== null);
  };
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e

  signOut = () => {
    sessionStorage.removeItem('username');
    history.push('/home');
    window.location.reload(false);
  };

  render(){
    return (
      <div className='background'>
        <div className='app center'>
          <Router history={history}>
            <Header isSignedIn={this.isSignedIn} signOut={this.signOut} username={sessionStorage.getItem('username')}/>

            <Switch>

              <Route path={'/home'} render={() => (
<<<<<<< HEAD
                isSignedIn()
                  ? <Home user={sessionStorage.getItem('username')}/>
                  : <SignIn/>
              )}/>

              <Route path={'/sign-in'} render={() => (
                isSignedIn()
                  ? <Home user={sessionStorage.getItem('username')}/>
                  : <SignIn/>
              )}/>

              <Route path={'/create-account'} render={() => (
                isSignedIn()
                  ? <Home user={sessionStorage.getItem('username')}/>
=======
                <Home username={sessionStorage.getItem('username')}/>
              )}/>

              <Route path={'/profile/:username'} render={(profile) => (
                this.isSignedIn()
                  ? <Profile username={sessionStorage.getItem('username')} profile={profile.match.params.username}/>
                  : <CreateAccount/>
              )}/>

              <Route path={'/post/:postID'} render={(post) => (
                <Home username={sessionStorage.getItem('username')} postID={post.match.params.postID}/>
              )}/>

              <Route path={'/new-post'} render={() => (
                this.isSignedIn()
                  ? <NewPost username={sessionStorage.getItem('username')}/>
                  : <CreateAccount/>
              )}/>

              <Route path={'/create-account'} render={() => (
                this.isSignedIn()
                  ? <Home username={sessionStorage.getItem('username')}/>
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e
                  : <CreateAccount/>
              )}/>

              <Route path={'/'} render={() => (
<<<<<<< HEAD
                isSignedIn()
                  ? <Home user={sessionStorage.getItem('username')}/>
                  : <SignIn/>
=======
                <Home username={sessionStorage.getItem('username')}/>
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e
              )}/>

            </Switch>

          </Router>
        </div>
      </div>
    );
  }
}

export default App;