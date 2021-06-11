import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import history from "../config/history";
import ViewPost from "./ViewPost";
import PostBanner from "./PostBanner";
import NewPostBox from "./NewPostBox";
import axios from "axios";
import { API_Routes } from "../config/api_routes";
import "../styles/style.css";

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: [],
      upvoted: [],
      saved_upvotes: [],
      postID: this.props.postID,
      loading: true,
    };
  }

  componentDidMount() {
    this.getUpvoted();
  }

  getPosts = () => {
    axios.get(`${API_Routes.API_POST_URL}/getPosts`).then(response => {
      this.setState({
        posts: response.data,
        upvoted: new Array(response.data.length).fill(false),
      });
      this.findUpvoted();
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

  onUpvote = (index) => {
    let ar = this.state.upvoted;
    ar[index] = !ar[index];
    let ar2 = this.state.posts;
    ar2[index]['Upvotes'] = ar2[index]['Upvotes'] + 1;
    this.setState({
      upvoted: ar,
      posts: ar2,
    });

    let id = this.state.posts[index]['PostID'];
    let data = {
      id: id,
      username: this.props.username,
    };

    axios.post(`${API_Routes.API_POST_URL}/upvote`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (response) {

      if(response.status === 200){
        //window.location.reload(false);

    }}).catch(error => {
          console.log("ERROR from View Post! Could not upvote: " + error);
        }
      );
  };

  getUpvoted = () => {
    axios.get(`${API_Routes.API_POST_URL}/getUpvoted/${this.props.username}`).then(response => {
      this.setState({
        saved_upvotes: response.data,
      });
      this.getPosts();
    }).catch(error => {
      console.log(error);
    });
  };

  findUpvoted(){
    for(let i = 0; i < this.state.saved_upvotes.length; i++){
      for(let j = 0; j < this.state.posts.length; j++){
        if(this.state.posts[j]['PostID'] === this.state.saved_upvotes[i][this.props.username]){
          let ar = this.state.upvoted;
          ar[j] = true;
          this.setState({
            upvoted: ar,
          });
          break;
        }
      }
    }
    this.setState({
      loading: false,
    })
  }

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
                  <PostBanner key={index} title={this.state.posts[index]['Title']}
                              author={this.state.posts[index]['Author']}
                              index={index}
                              goToPost={this.goToPost}
                              goToAuthor={this.goToAuthor}
                              upvotes={this.state.posts[index]['Upvotes']}
                              onUpvote={this.onUpvote}
                              isUpvoted={this.state.upvoted[index]}
                  />
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