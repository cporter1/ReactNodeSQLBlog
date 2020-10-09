import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button, Alert} from 'reactstrap';
import history from '../history';
import axios from "axios";

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
    //let username = ev.target.username.value;

    let data = JSON.stringify({
      email: ev.target.email.value,
      password: ev.target.password.value
    });

    axios.post('http://10.0.0.97:3001/signIn', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

      // GOOD LOGIN
      .then(function (response) {

        if(response.status === 200){
          sessionStorage.setItem('username', response.data[0]['Username']);
          history.push('/home');
          window.location.reload(false);
        }}  )


      //HANDLE SERVER ERRORS
      .catch(error => {
        console.log(error.response);

        if(error.response.status === 404){
          this.setState({
            error_message: 'There is no account with that email.',
            error_visible: true,
          });
          console.log('reached');
        }

        else if(error.response.status === 401) {
          this.setState({
            error_message: 'Passwords do not match for this email.',
            error_visible: true,
          });
        }

        else{
          console.log("ERROR: " + error);
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
      <div className='center'>

        <Label>Sign In!</Label>

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
          <Button>Sign In</Button>

          <div style={{height: '1em'}}/>
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
            {this.state.error_message}
          </Alert>
        </Form>
      </div>
    );
  }

}

export default SignIn;