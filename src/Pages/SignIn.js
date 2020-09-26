import React, {Component} from 'react';
import {Form, Input, Label, Button} from 'reactstrap';
//import "./SignIn.css";

class SignIn extends Component {

  onSubmit = (ev) => {
    console.log(ev.target.email.value);
    console.log(ev.target.email.value);
    console.log(ev.target.email.value);
  };

  render(){

    return(
      <div className='center'>
        <Form onSubmit={this.onSubmit}>
          <Label>Email: </Label>
          <Input id='email' type='text' style={{border: '2px solid #000000'}}/>
          <div style={{height: '0.4em'}}/>
          <Label>Username: </Label>
          <Input id='username' type='text' style={{border: '2px solid #000000'}}/>
          <div style={{height: '0.4em'}}/>
          <Label>Password: </Label>
          <Input id='password' type='password' style={{border: '2px solid #000000'}}/>
          <div style={{height: '0.4em'}}/>
          <Button>Create Account</Button>
        </Form>
      </div>
    );
  }

}

export default SignIn;