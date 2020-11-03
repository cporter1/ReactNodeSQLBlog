import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import history from "../history";
import ViewPost from "./ViewPost";
import PostBanner from "./PostBanner";
import NewPostBox from "./NewPostBox";
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
  }

  componentDidMount() {
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

  goToPost = (index) => {
    let postID = this.getPostID(index);
    history.push(`/post/${postID}`);
    window.location.reload(false);
  };

  getPostID = (index) => {
    return this.state.posts[index]['PostID'];
  };

  goToAuthor = (index) => {
    let author = this.getAuthor(index);
    history.push(`/profile/${author}`);
    window.location.reload(false);
  };

  getAuthor = (index) => {
    return this.state.posts[index]['Author'];
  };

  render(){

    if(!this.state.loading){

      if(this.state.postID){

        return (
          <div>
            <ViewPost username={this.props.username} postID={this.state.postID}/>
          </div>
        )

      } else {

        return(
          <div className='home-content'>
            <div className='posts'>
              {this.state.posts.map((key, index) => {
                return (
                  <PostBanner key={index} title={this.state.posts[index]['Title']} author={this.state.posts[index]['Author']} index={index} goToPost={this.goToPost} goToAuthor={this.goToAuthor}/>
                );
              })}
            </div>

            <NewPostBox newTextPost={this.createPost} newLinkPost={this.createPost}/>
          </div>

        )
      }
    } else {
      return (
        <div style={{marginTop: '10px'}}>
          <Label>Loading...</Label>
        </div>
      )
    }
  }


}

export default Home;