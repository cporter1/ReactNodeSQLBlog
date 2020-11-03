import React, { Component } from 'react';
import axios from "axios";
import "../styles/style.css";
import '../history';
import {Label} from "reactstrap";
import Comment from "./Comment";
import PostBanner from "./PostBanner";
import history from "../history";

class Profile extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: this.props.username,
      profile: this.props.profile,
      profileData: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  goToPost = (index) => {
    let postID = this.getPostID(index);
    history.push(`/post/${postID}`);
    window.location.reload(false);
  };

  getPostID = (index) => {
    return this.state.profileData[index]['PostID'];
  };

  loadData = () => {
    axios.get(`http://10.0.0.97:3001/profile/${this.props.profile}`).then(response => {
      console.log(response.data);
      this.setState({
        profileData: response.data,
        loading: false,
      });

    }).catch(error => {
      console.log(error);
    });
  };

  goToAuthor = (index) => {
    let author = this.getAuthor(index);
    history.push(`/profile/${author}`);
    window.location.reload(false);
  };

  getAuthor = (index) => {
    return this.state.profileData[index]['Author'];
  };


  render() {
    if(!this.state.loading){
      return (
        <div className='profile'>
          {this.state.profileData.map((key, index) => {
            //IF IT IS A COMMENT
            if(this.state.profileData[index]['Title'] === null){
              return (
                <Comment key={index} i={index} goToAuthor={this.goToAuthor} commentIsOpen={false} body={this.state.profileData[index]['Body']} author={this.state.profileData[index]['Author']} loadReply={false}/>
              );
            }
            //IF IT IS A POST
            else {
              return (
                <PostBanner key={index} title={this.state.profileData[index]['Title']} author={this.state.profileData[index]['Author']} index={index} goToPost={this.goToPost} goToAuthor={this.goToAuthor}/>
              );
            }
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

export default Profile;