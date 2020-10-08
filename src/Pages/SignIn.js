import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button} from 'reactstrap';
import history from '../history';
import axios from "axios";

class SignIn extends Component {

  constructor(props){
    super(props);

    this.state = {};
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
    }).then(function (response) {
      if(response.status === 200){
        sessionStorage.setItem('username', response.data[0]['Username']);
        history.push('/home');
        window.location.reload(false);
      }

      else if(response.status === 400){
        console.log('BAD LOGIN');
        //TODO HANDLE BAD LOGIN
      }
    })
      .catch(function (error) {
        console.log("ERROR " + error);
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
        </Form>
      </div>
    );
  }

}

export default SignIn;