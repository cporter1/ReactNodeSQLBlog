import React, {Component} from 'react';
import {Form, Input, Label, Button, Row, Col} from 'reactstrap';

class SignIn extends Component {

  render(){
    return(
      <Row>
        <Col>
          <div>
            <Label>Username:</Label>
            <Input type='text'/>
            <Label>Password:</Label>
            <Input type='text'/>
          </div>
        </Col>
      </Row>
    );
  }

}

export default SignIn;