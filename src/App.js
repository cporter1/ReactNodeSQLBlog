import React, {Component} from "react";
import {Router, Switch, Route} from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Header from "./pages/Header";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Profile from "./pages/Profile";
import history from './config/history';
import './styles/style.css';
import axios from "./config/axios.config";
import {API_Routes} from "./config/api_routes";
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  //Function to check if the user is logged in
  //Returns true if username is found in session storage, false if not
  isSignedIn = () => {
    let username = sessionStorage.getItem('username');
    return (username !== '' && username !== null);
  };

  signOut = () => {
    sessionStorage.removeItem('username');
    const cookies = new Cookies();

    let data = {
      sessionID: cookies.get('sessionID')
    };

    axios.post(`${API_Routes.API_USER_URL}/signOut`, data).then(response => {
      console.log(response);
      // const cookies = new Cookies();
      // cookies.remove('sessionID');
    }).catch(error => {
      console.log(error);
    });
    history.push('/home');
    window.location.reload(false);
    cookies.remove('email', { path: '/', domain: "localhost"});
    cookies.remove('sessionID', { path: '/', domain: "localhost"});
  };

  componentDidMount() {
    this.backListener = history.listen(location => {
      if (location.action === "POP") {
        window.location.reload(false);
      }
    });
  }

  componentWillUnmount() {
    // Unbind listener
    this.backListener();
  }

  render(){
    return (
      <div className='background'>
        <div className='app center'>
          <Router history={history}>
            <Header isSignedIn={this.isSignedIn} signOut={this.signOut} username={sessionStorage.getItem('username')}/>

            <Switch>

              <Route path={'/home'} render={() => (
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
                  : <CreateAccount/>
              )}/>

              <Route path={'/'} render={() => (
                <Home username={sessionStorage.getItem('username')}/>
              )}/>

            </Switch>

          </Router>
        </div>
      </div>
    );
  }
}

export default App;