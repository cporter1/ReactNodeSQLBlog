import React, { Component } from 'react';
import { Label } from 'reactstrap';

class Home extends Component {

  constructor(props){
    super(props);
  }


  render(){
    return(
      <div>
        <Label>Hello {JSON.parse(sessionStorage.getItem('user')).email}!</Label>
      </div>
    )
  }


}

export default Home;