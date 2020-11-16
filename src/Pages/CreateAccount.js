import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button} from 'reactstrap';
import history from "../history";
import { register } from '../services/auth.service';
//import "./CreateAccount.css";

class CreateAccount extends Component {

  onSubmitCreateAccount = (ev) => {
    ev.preventDefault();

    if(ev.target.username.value === '' ||
       ev.target.email.value    === '' ||
       ev.target.password.value === ''   ) {

        console.log('Input non-blank values')
        return;
      }

   register(
        ev.target.username.value,
        ev.target.email.value,
        ev.target.password.value
      )
      .then(response => {
        if(response.status === 201) {
          history.push('/signin');
          window.location.reload(false);
        }
      })
      .catch(err => {
        console.log(err)
      })
    
  };

  render(){

    return(
      <div className='center'>

        <Label>Welcome!</Label>

        <Form onSubmit={this.onSubmitCreateAccount}>
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