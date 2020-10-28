import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import history from "../history";
import PostTable from "./PostTable";
import ViewPost from "./ViewPost";
import axios from "axios";
import "../styles/style.css";

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: [],
      postID: this.props.postID,
      loading: true,
    };

    this.getPosts();
  }

  getPosts = () => {
    axios.get('http://10.0.0.97:3001/getPosts').then(response => {
      this.setState({
        posts: response.data,
        loading: false,
      });
    }).catch(error => {
      console.log(error);
    });
  };

  createPost = () => {
    history.push('/new-post');
    window.location.reload(false);
  };

  render(){

    if(!this.state.loading){

      if(this.state.postID){

        return (
          <div>
            <ViewPost postID={this.state.postID}/>
          </div>
        )

      } else {

        return(
          <div className='posts'>
            <PostTable posts={this.state.posts}/>
            <Button onClick={this.createPost}>Create Post</Button>
          </div>
        )
      }
    } else {
      return (
        <div>
          <Label>Loading...</Label>
        </div>
      )
    }
  }


}

export default Home;