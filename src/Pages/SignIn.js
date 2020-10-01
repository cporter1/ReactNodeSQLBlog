import React, {Component} from 'react';
import {Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Button} from 'reactstrap';
import createProxyMiddleware from 'http-proxy-middleware';
//import "./CreateAccount.css";

class SignIn extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.callBackendAPI();
  }

  onSubmit = (ev) => {
    /*ev.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));*/
  };


  callBackendAPI = async () => {
    fetch(`http://localhost:3001/api/hey`)
      .then(response => response.text())
      .then(response => this.setState({data: response}));
  };

  render(){

    return(
      <div className='center'>

        <Label>{this.state.data}</Label>

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