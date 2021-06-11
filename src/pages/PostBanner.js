import React, {Component} from 'react';
import '../styles/style.css'
import img_unclicked from '../data/upvote_unclicked.png'
import img_clicked from '../data/upvote_clicked.png'
import history from "../config/history";
import axios from "../config/axios.config";
import {API_Routes} from "../config/api_routes";

class PostBanner extends Component {
  constructor(props){
    super(props);

    this.state = {
      post: props.post,
      isUpvoted: false,
    }
  }

  goToPost = () => {
    history.push(`/post/${this.state.post['PostID']}`);
    window.location.reload(false);
  };

  goToAuthor = () => {
    history.push(`/profile/${this.state.post['Author']}`);
    window.location.reload(false);
  };

  onUpvote = () => {
    let id = this.state.post['PostID'];
    let data = {
      id: id,
      username: sessionStorage.getItem('username'),
    };

    axios.post(`${API_Routes.API_POST_URL}/upvote`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (response) {

      if(response.status === 200){
        //window.location.reload(false);

      }}).catch(error => {
        console.log("ERROR from Home! Could not upvote: " + error);
      }
    );
  };

  onDownvote = () => {
    let id = this.state.post['PostID'];
    let data = {
      id: id,
      username: sessionStorage.getItem('username'),
    };

    axios.post(`${API_Routes.API_POST_URL}/downvote`, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (response) {

      if(response.status === 200){

      }}).catch(error => {
        console.log("ERROR from Home! Could not downvote: " + error);
      }
    );
  };

  render(){
    return (
      <div className='post-banner-rect border-custom'>
        <div className='post-banner-text'>
          <h4>{1}</h4>
          <div style={{width: '0.75em'}}/>
          {this.state.isUpvoted
            ?
            <img src={img_clicked} onClick={() => this.onUpvote()} className='upvote' style={{marginTop: '7px', height: '15px', width: '25px'}} alt='Unclicked'/>
            :
            <img src={img_unclicked} onClick={() => this.onDownvote()} className='upvote' style={{marginTop: '7px', height: '15px', width: '25px'}} alt='Unclicked'/>
          }
          <div style={{width: '1em'}}/>
          <h4 onClick={() => this.goToPost()} className='link'>{this.state.post['Title']}</h4>
          <div className='right'>
            <h4 onClick={() => this.goToAuthor()} className='link'>{this.state.post['Author']}</h4>
          </div>
        </div>
      </div>
    );
  }
}

/*= ({title, author, index, goToPost, goToAuthor, upvotes, onUpvote, isUpvoted}) => {
  return (
    <div className='post-banner-rect border-custom'>
      <div className='post-banner-text'>
        <h4>{upvotes}</h4>
        <div style={{width: '0.75em'}}/>
        {isUpvoted
          ?
          <img src={img_clicked} onClick={() => onUpvote(index)} className='upvote' style={{marginTop: '7px', height: '15px', width: '25px'}} alt='Unclicked'/>
          :
          <img src={img_unclicked} onClick={() => onUpvote(index)} className='upvote' style={{marginTop: '7px', height: '15px', width: '25px'}} alt='Unclicked'/>
        }
        <div style={{width: '1em'}}/>
        <h4 onClick={() => goToPost(index)} className='link'>{title}</h4>
        <div className='right'>
          <h4 onClick={() => goToAuthor(index)} className='link'>{author}</h4>
        </div>
      </div>
    </div>
  );
};*/

export default PostBanner;