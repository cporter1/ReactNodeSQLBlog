import React, { Component } from 'react';
import axios from "axios";
import history from "../history";

class NewPost extends Component {

  constructor(props){
    super(props);

    this.state = {
      error_message: '',
      error_visible: false,
    };
  }

  getNewCode = () => {
    return [...Array(6)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  };

  submitPost = (ev) => {
    ev.preventDefault();
    let today = new Date();
    let timePosted = today.getFullYear() + '-'
      + (today.getMonth() + 1) + '-'
      + today.getDate() + ' '
      + today.getHours() + ':'
      + today.getMinutes() + ':'
      + today.getSeconds();

    let title = ev.target.title.value;
    let body = ev.target.body.value;

    title = title.replace(/'/gi, "''");
    body = body.replace(/'/gi, "''");

    let data = JSON.stringify({
      title: title,
      author: this.props.username,
      body: body,
      timePosted: timePosted,
      postID: this.getNewCode(),
    });

    axios.post('http://10.0.0.97:3001/newPost', data, {
      headers: {
        'Content-Type': 'application/json',
      }

      // GET THE RESPONSE FROM THE SERVER
    }).then(function (response) {

      // SUCCESSFUL POST CREATION
      if(response.status === 200){
        history.push('/home');
        window.location.reload(false);
      }})

      // ERROR IN POST CREATION
      .catch(error => {
        if(error.response.status === 400){
          this.setState({
            error_message: 'Could not create post.',
            error_visible: true,
          });
        }

        else{
          console.log("ERROR: " + error);
        }
      });
  };

  render(){
    return(
      <div />

    )
  }


}

export default NewPost;