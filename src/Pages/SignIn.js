import React, {Component} from 'react';
import {Form, Input, Button, Alert} from 'reactstrap';
import history from '../history';
import axios from "../config/axios.config";
import "../styles/style.css";
import {API_Routes} from "../api_routes";

class SignIn extends Component {

  constructor(props){
    super(props);

    this.state = {
      error_message: '',
      error_visible: false,
    };
  }

  getSessionCode = () => {
    return [...Array(8)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  };

  onSubmit = (ev) => {
    ev.preventDefault();

    let email = ev.target.email.value;
    let password = ev.target.password.value;
    let sessionID = this.getSessionCode();

    if(email === '' || password === ''){
      this.setState({
        error_message: 'Please enter a valid email and password.',
        error_visible: true,
      });
      return;
    }
    let data = {
      email: ev.target.email.value,
      password: ev.target.password.value,
      sessionID: sessionID,
    };
    axios.post(`${API_Routes.API_USER_URL}/signIn`, data)
      .then( (response) => {

        // GOOD LOGIN
        if(response.status === 200){
          sessionStorage.setItem('username', response.data[0]['Username']);

          history.push('/home');
          window.location.reload(false);
        }
      })
      // HANDLE SERVER ERRORS
      .catch(error => {
        console.log("error from frontend: ");
        console.log(error.response.status);

        // ACCOUNT EMAIL NOT FOUND
        if(error.response.status === 404){
          this.setState({
            error_message: 'There is no account with that email.',
            error_visible: true,
          });
        }

        // PASSWORD DOES NOT MATCH
        else if(error.response.status === 401) {
          this.setState({
            error_message: 'Passwords do not match for this email.',
            error_visible: true,
          });
        }

        // SOME OTHER ERROR
        else{
          this.setState({
            error_message: 'Unknown Sign In Error...',
            error_visible: true,
          });
          console.log("ERROR FROM SIGN IN: " + error);
        }
      });
  };

  onDismiss = () => {
    this.setState({
      error_visible: false,
    });
  };

  render(){

    return(
      <div className='sign-in-box'>
        <Form onSubmit={this.onSubmit} style={{display: 'inline-flex', maxWidth: '280px'}}>
          <Input className='small-input' size='sm' id="email" type='text' placeholder="Email" style={{maxWidth: '33%'}}/>
          <div style={{width: '5px'}}/>
          <Input className='small-input' size='sm' id="password" type="password" placeholder="Password" style={{maxWidth: '33%'}}/>
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
            {this.state.error_message}
          </Alert>
          <Button style={{padding: '5px 10px 5px 10px', marginLeft: '5px', color: 'white', backgroundColor: '#365090', maxWidth: '33%'}}>Sign In</Button>
        </Form>
      </div>
    );
  }

}

export default SignIn;