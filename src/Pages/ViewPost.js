import React, {Component} from 'react';
import axios from '../config/axios.config';
import {Label} from "reactstrap";
import Comment from './Comment';
import CommentBox from './CommentBox';
import history from "../history";
import {API_Routes} from "../api_routes";
import Cookies from "universal-cookie";

class ViewPost extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      post: null,
      bodyExists: true,
      username: this.props.username,
      openComment: '',
      postID: this.props.postID,
      orderedComments: [],
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getCommentCode = () => {
    return [...Array(8)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  };

  getPost = () => {
    axios.get(`${API_Routes.API_POST_URL}/post/${this.props.postID}`).then(response => {
      if(response.data[0]['Body'] === ''){
        this.setState({
          bodyExists: false,
        })
      }
      this.setState({
        post: response.data,
      });

      //Once we get the post, we get the comments
      this.getComments();

    }).catch(error => {
      console.log(error);
    });
  };

  getComments = () => {
    axios.get(`${API_Routes.API_POST_URL}/comments/${this.props.postID}`).then(response => {
      this.setState({
        comments: response.data,
      });
      this.orderComments();
    }).catch(error => {
      console.log(error);
    });
  };

  openCommentReply = (index) => {
    if(this.state.openComment === index){
      this.setState({
        openComment: -1
      });
    } else {
      this.setState({
        openComment: index,
      });
    }
  };

  commentIsOpen = (index) => {
    return (this.state.openComment === index);
  };

  getCommentIDFromIndex = (index) => {
    return this.state.orderedComments[index]['CommentID'];
  };

  getDepthFromIndex = (index) => {
    return this.state.orderedComments[index]['Depth'];
  };

  submitReply = (ev) => {
    ev.preventDefault();
    let today = new Date();
    let timePosted = today.getFullYear() + '-'
      + (today.getMonth() + 1) + '-'
      + today.getDate() + ' '
      + today.getHours() + ':'
      + today.getMinutes() + ':'
      + today.getSeconds();

    let reply = ev.target.reply.value;

    //Replaces all ' with '' for SQL Database Storage
    reply = reply.replace(/'/gi, "''");

    //get Cookie Data
    const cookies = new Cookies();

    let data = {
      body: reply,
      author: this.props.username,
      timePosted: timePosted,
      parentID: this.getCommentIDFromIndex(this.state.openComment),
      commentID: this.getCommentCode(),
      postID: this.props.postID,
      depth: this.getDepthFromIndex(this.state.openComment) + 1,
    };

    axios.post(`${API_Routes.API_POST_URL}/newComment`, data, {
      headers: {
        'Content-Type': 'application/json',
      }

      // GET THE RESPONSE FROM THE SERVER
    }).then(function (response) {
        if(response.status === 200){
          window.location.reload(false);
        }})

    // ERROR IN POST CREATION
      .catch(error => {
        if(error.response.status === 400){
          this.setState({
            error_message: 'Could not create comment.',
            error_visible: true,
          });
        }

        else{
          console.log("ERROR from View Post! Could not create reply: " + error);
        }
      });
  };

  //HELPER FUNCTION FOR ORDERING THE COMMENTS
  //returns ordered list of all comments underneath comment with parentID
  getChildren = (parentID) => {
    let children = [];
    for(let i = 0; i < this.state.comments.length; i++){
      if(this.state.comments[i]['ParentID'] === parentID){
        children.push(this.state.comments[i]);
        children = children.concat(this.getChildren(this.state.comments[i]['CommentID']));
      }
    }
    return children;
  };

  //Orders comments by child/parent and time posted
  orderComments = () => {
    let orderedComments = [];
    for(let i = 0; i < this.state.comments.length; i++){
      if(this.state.comments[i]['ParentID'] === this.state.postID){
        orderedComments.push(this.state.comments[i]);
        orderedComments = orderedComments.concat(this.getChildren(this.state.comments[i]['CommentID']));
      }
    }

    this.setState({
      loading: false,
      orderedComments: orderedComments,
    });
  };

  goToPostAuthor = () => {
    let author = this.state.post[0]['Author'];
    history.push(`/profile/${author}`);
    window.location.reload(false);
  };

  goToCommentAuthor = (index) => {
    let author = this.state.orderedComments[index]['Author'];
    history.push(`/profile/${author}`);
    window.location.reload(false);
  };

  render(){
    if(!this.state.loading){
      return(
        <div className='view-post-page'>
          <div className='view-post-top-content'>
            <div className='view-post-rect'>
              <div className='post-banner-rect'>
                <div className='post-banner-text'>
                  <h4 style={{cursor: 'default'}}>{this.state.post[0]['Title']}</h4>
                  <div className='right'>
                    <h4 onClick={this.goToPostAuthor} className='link'>{this.state.post[0]['Author']}</h4>
                  </div>
                </div>
              </div>

              {this.state.bodyExists
                ?
                <div className='view-post-body-rect'>
                  <div className='view-post-body-text'>
                    <h5 style={{marginRight: '10px'}}>{this.state.post[0]['Body']}</h5>
                  </div>
                </div>
                :
                <div/>
              }
            </div>

            <CommentBox postID={this.state.post[0]['PostID']} username={this.props.username}/>

          </div>

          <div className='page-divider'>
              <b style={{padding: '10px', marginLeft: '20px', color: 'white', marginBottom: '0'}}>Comments</b>
          </div>

          {this.state.orderedComments.map((key, index) => {
            return (
              <Comment key={index} i={index} offset={this.getDepthFromIndex(index)} submitReply={this.submitReply} commentIsOpen={this.commentIsOpen(index)} openReply={this.openCommentReply} body={this.state.orderedComments[index]['Body']} author={this.state.orderedComments[index]['Author']} loadReply={true} goToAuthor={this.goToCommentAuthor}/>
            );
          })}

        </div>
      );
    }

    else{
      return (
        <div style={{marginTop: '10px'}}>
          <Label>Loading...</Label>
        </div>
      )
    }
  }

}

export default ViewPost;