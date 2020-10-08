import React, { Component } from 'react';
import { Label } from 'reactstrap';

class Home extends Component {

  render(){
    return(
      <div>
        <Label>Hello {this.props.username}!</Label>
      </div>
    )
  }


}

export default Home;