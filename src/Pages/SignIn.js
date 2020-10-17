import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button} from 'reactstrap';
import history from '../history';
import {login} from '../services/auth.service';

class SignIn extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }



  onSubmitLogin = (ev) => {
    ev.preventDefault();
    
    console.log('onSumbitLogin being called', ev.target.email.value,
      ev.target.password.value)
      
    login(ev.target.email.value, ev.target.password.value)
      .then(response => {

        console.log(response)
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



  render(){
    
    return(
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
        </Form>
      </div>
    );
  }

}

export default SignIn;