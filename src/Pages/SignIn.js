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

  onSubmit = (ev) => {
    ev.preventDefault();

    let data = JSON.stringify({
      email: ev.target.email.value,
      password: ev.target.password.value
    });

    axios.post(`${API_Routes.API_USER_URL}/signIn`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
      })
      .then(function (response) {
        // GOOD LOGIN
        if(response.status === 200){
          sessionStorage.setItem('username', response.data[0]['Username']);
          history.push('/home');
          window.location.reload(false);
        }}  )
      // HANDLE SERVER ERRORS
      .catch(error => {
        console.log(error)
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
      <div>
        <Form onSubmit={this.onSubmit} style={{textAlign: 'right'}}>
          <div className='sign-in-box'>
          <Input className='small-input' size='sm' id="email" type='text' placeholder="Email" />
          <div style={{width: '1em'}}/>
          <Input className='small-input' size='sm' id="password" type="password" placeholder="Password" />
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
            {this.state.error_message}
          </Alert>
          </div>
          <Button style={{marginRight: '10px', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}>Sign In</Button>
        </Form>
      </div>
    );
  }

}

export default SignIn;