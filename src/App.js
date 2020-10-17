import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './css/App.css';
import CreateAccount from "./Pages/CreateAccount";
import SignIn from "./Pages/SignIn";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import history from './history';

import 'bootstrap/dist/css/bootstrap.css';

//Function to check if the user is logged in
//Returns true if username is found in session storage, false if not
function isSignedIn() {
  let user = sessionStorage.getItem('user');
  return (user !== '' && user !== null);
}

function App() {

  return (
    <div>
      <BrowserRouter history={history}>
        <Header />
        <div className='App'>
          <header className="App-header">

            <Switch>

              <Route path={'/home'} render={() => (
                isSignedIn()
                  ? <Home user={sessionStorage.getItem('user')}/>
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
                  : <CreateAccount/>
              )}/>

              <Route path={'/'} render={() => (
                isSignedIn()
                  ? <Home user={sessionStorage.getItem('username')}/>
                  : <SignIn/>
              )}/>

            </Switch>

          </header>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
