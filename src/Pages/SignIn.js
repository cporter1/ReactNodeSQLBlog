import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button, Alert} from 'reactstrap';
import history from '../history';
import axios from "axios";
import "../styles/style.css";

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

    axios.post('http://10.0.0.97:3001/signIn', data, {
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
        console.log(error.response);

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
      <div className='input-small'>

        <Label>Sign In</Label>

        <Form onSubmit={this.onSubmit}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email</InputGroupText>
            </InputGroupAddon>
            <Input id="email" type='text' placeholder="Email" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input id="password" type="password" placeholder="Password" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
            {this.state.error_message}
          </Alert>
          <div style={{height: '0.4em'}}/>
          <Button>Sign In</Button>
        </Form>
      </div>
    );
  }

}

export default SignIn;