import React, {Component} from 'react';
import {Form, Input, Button, Alert} from 'reactstrap';
import history from '../history';
<<<<<<< HEAD
import {login} from '../services/auth.service';
=======
import axios from "axios";
import "../styles/style.css";
import {API_Routes} from "../api_routes";
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e

class SignIn extends Component {

  constructor(props){
    super(props);
<<<<<<< HEAD
    this.state = {};
=======

    this.state = {
      error_message: '',
      error_visible: false,
    };
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e
  }
  
  onSubmitLogin = (ev) => {
    ev.preventDefault();
<<<<<<< HEAD
    
    console.log('onSumbitLogin being called', ev.target.email.value,
      ev.target.password.value)
    login(ev.target.email.value, ev.target.password.value)
      .then(response => {
        console.log('resp: ',response)
        if(response.status === 200) {

          history.push('/home')
          window.location.reload(false);
        }
        else if (response.status === 401) {
          console.log('Bad Login')
        }
      })
      .catch(err => {
        console.log('Bad Login')
      })

  }
=======

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

>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e
  render(){
    return(
<<<<<<< HEAD
      <div className='center'>
        <Label>Sign In!</Label>

        <Form onSubmit={this.onSubmitLogin}>
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
=======
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
>>>>>>> 0933fe06d7d90e3aa018019d1258b11781e0760e
        </Form>
      </div>
    );
  }

}

export default SignIn;