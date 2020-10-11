import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import history from "../history";
import PostTable from "./PostTable";
import ViewPost from "./ViewPost";

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      postID: this.props.postID,
    };
  }

  createPost = () => {
    history.push('/new-post');
    window.location.reload(false);
  };

  render(){

    console.log(this.state.postID);

    if(this.state.postID){
      return (
        <div>
          <Label>Viewing Post!</Label>
          <ViewPost postID={this.state.postID}/>
        </div>
      )

    } else {
      return(
        <div>
          <Label>Hello {this.props.username}!</Label>
          <PostTable/>
          <Button onClick={this.createPost}>Create Post</Button>
        </div>
      )
    }
  }


}

export default Home;