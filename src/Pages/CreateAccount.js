import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button} from 'reactstrap';
import axios from 'axios';
//import "./CreateAccount.css";

class CreateAccount extends Component {

  onSubmit = (ev) => {
    ev.preventDefault();

    let data = JSON.stringify({
      email: ev.target.email.value,
      username: ev.target.username.value,
      password: ev.target.password.value
    });

    axios.post('http://10.0.0.97:3001/new-account', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /*fetch(`http://10.0.0.97:3001/new-account`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        username: ev.target.username.value,
        email: ev.target.email.value,
        password: ev.target.password.value,
      }
    })
      .then(response => response.text())
      .then(response => console.log(response));*/
  };

  render(){

    return(
      <div className='center'>

        <Label>Welcome!</Label>

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
              <InputGroupText>Username</InputGroupText>
            </InputGroupAddon>
            <Input id="username" type='text' placeholder="Username" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Password</InputGroupText>
            </InputGroupAddon>
            <Input id="password" type="password" placeholder="Password" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <Button>Create Account</Button>
        </Form>
      </div>
    );
  }

}

export default CreateAccount;