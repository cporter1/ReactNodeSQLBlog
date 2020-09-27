import React from 'react';
import './App.css';
import SignIn from "./Pages/SignIn";
import Header from "./Pages/Header";

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <Header />
      <div className='App'>
        <header className="App-header">
          <SignIn/>
        </header>
      </div>
    </div>
  );
}

export default App;
