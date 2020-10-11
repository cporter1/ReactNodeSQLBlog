import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import history from "../history";
import PostTable from "../Components/PostTable";

class Home extends Component {

  createPost = () => {
    history.push('/new-post');
    window.location.reload(false);
  };

  render(){
    return(
      <div>
        <Label>Hello {this.props.username}!</Label>
        <PostTable/>
        <Button onClick={this.createPost}>Create Post</Button>
      </div>
    )
  }


}

export default Home;