import React from "react";
import {Router, Switch, Route, useParams} from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import SignIn from "./Pages/SignIn";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import history from './history';
import './styles/style.css';

import 'bootstrap/dist/css/bootstrap.css';

//Function to check if the user is logged in
//Returns true if username is found in session storage, false if not
function isSignedIn() {
  let username = sessionStorage.getItem('username');
  return (username !== '' && username !== null);
}

function App() {

  return (
    <div className='background'>
      <div className='app center'>
        <Router history={history}>
          <Header />

          <Switch>

            <Route path={'/home'} render={() => (
              isSignedIn()
                ? <Home username={sessionStorage.getItem('username')}/>
                : <SignIn/>
            )}/>

            <Route path={'/post/:postID'} render={(post) => (
              isSignedIn()
                ? <Home postID={post.match.params.postID}/>
                : <SignIn/>
            )}/>

            <Route path={'/new-post'} render={() => (
              isSignedIn()
                ? <NewPost username={sessionStorage.getItem('username')}/>
                : <SignIn/>
            )}/>

            <Route path={'/sign-in'} render={() => (
              isSignedIn()
                ? <Home username={sessionStorage.getItem('username')}/>
                : <SignIn/>
            )}/>

            <Route path={'/create-account'} render={() => (
              isSignedIn()
                ? <Home username={sessionStorage.getItem('username')}/>
                : <CreateAccount/>
            )}/>

            <Route path={'/'} render={() => (
              isSignedIn()
                ? <Home username={sessionStorage.getItem('username')}/>
                : <SignIn/>
            )}/>

          </Switch>

        </Router>
      </div>
    </div>
  );
}

export default App;
