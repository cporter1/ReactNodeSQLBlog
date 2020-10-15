import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button, Alert} from 'reactstrap';
import axios from 'axios';
import history from "../history";
import "./SignIn.css";

class CreateAccount extends Component {

  constructor(props){
    super(props);

    this.state = {
      error_message: '',
      error_visible: false,
    }
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    let username = ev.target.username.value;

    // VERIFY EMAIL ADDRESS, CHECK TO SEE IF IT HAS AMPERSAND
    if(!ev.target.email.value.includes('@')){
      this.setState({
        error_message: 'Please enter a valid email.',
        error_visible: true,
      });
      return;
    }

    let user = ev.target.username.value;
    user = user.replace("'", "''");

    let data = JSON.stringify({
      email: ev.target.email.value,
      username: user,
      password: ev.target.password.value
    });

    axios.post('http://10.0.0.97:3001/createAccount', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (response) {

      //SUCCESSFUL ACCOUNT CREATION
      if(response.status === 200){
        sessionStorage.setItem('username', username);
        history.push('/home');
        window.location.reload(false);
      }})
      .catch(error => {

        if(error.response.status === 406){
          this.setState({
            error_message: 'There is already an account with that email.',
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
      <div className='SignIn'>

        <Label>Create An Account</Label>

        <Form onSubmit={this.onSubmit}>
          <InputGroup>
            <Input class="w-25" id="email" type='text' placeholder="Email" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <InputGroup>
            <Input id="username" type='text' placeholder="Username" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <InputGroup>
            <Input id="password" type="password" placeholder="Password" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
            {this.state.error_message}
          </Alert>
          <div style={{height: '0.4em'}}/>
          <Button>Create Account</Button>
        </Form>
      </div>
    );
  }

}

export default CreateAccount;