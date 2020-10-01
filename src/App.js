import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import CreateAccount from "./Pages/CreateAccount";
import SignIn from "./Pages/SignIn";
import Header from "./Pages/Header";

import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className='App'>
          <header className="App-header">
            <Switch>
              <Route path="/create-account">
                <CreateAccount />
              </Route>
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
