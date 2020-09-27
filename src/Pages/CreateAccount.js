import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button} from 'reactstrap';
//import "./CreateAccount.css";

class CreateAccount extends Component {

  onSubmit = (ev) => {
    console.log(ev.target.email.value);
    console.log(ev.target.email.value);
    console.log(ev.target.email.value);

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
            <Input id="email" type='text' placeholder="Username" />
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