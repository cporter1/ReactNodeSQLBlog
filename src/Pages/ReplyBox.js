import React, {Component} from 'react';
import '../styles/style.css';
import {Button, Input, Form} from "reactstrap";
import axios from '../config/axios.config';
import {API_Routes} from "../api_routes";
import Cookies from 'universal-cookie';

class ReplyBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      open: false,
      username: this.props.username,
      postID: this.props.postID,
    }
  }

  open = () => {
    this.setState({
      open: true
    })
  };

  getNewCode = () => {
    return [...Array(8)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
  };

  submitComment = (ev) => {
    ev.preventDefault();
    let today = new Date();
    let timePosted = today.getFullYear() + '-'
      + (today.getMonth() + 1) + '-'
      + today.getDate() + ' '
      + today.getHours() + ':'
      + today.getMinutes() + ':'
      + today.getSeconds();

    let comment = ev.target.comment.value;

    //Replaces all ' with '' for SQL Database Storage
    comment = comment.replace(/'/gi, "''");

    //get Cookie Data
    const cookies = new Cookies();

    let data = {
      body: comment,
      author: this.props.username,
      timePosted: timePosted,
      parentID: this.props.postID,
      commentID: this.getNewCode(),
      postID: this.props.postID,
      depth: 0,
      sessionID: cookies.get('sessionID'),
      email: cookies.get('email')
    };

    axios.post(`${API_Routes.API_POST_URL}/newComment`, data, {
      headers: {
        'Content-Type': 'application/json',
      }

      // GET THE RESPONSE FROM THE SERVER
    }).then(function (response) {

      // SUCCESSFUL POST CREATION
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
          console.log("ERROR: " + error);
        }
      });
  };

  render(){

    if(this.state.open){
      return (
        <div className='new-post-box'>
          <div className='reply-box-area'>
            <Form onSubmit={this.submitComment}>
              <h5 style={{marginRight: '10px'}}>Comment</h5>
              <Input id='comment' style={{marginLeft: '10px', height: '200px'}} size='sm' type='textarea'/>
              <Button style={{textAlign: 'center', marginTop: '10px', marginLeft: '10px', width: '100%', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}>Submit Comment</Button>
            </Form>
          </div>
        </div>
      );
    }

    else {
      return (
        <div className='new-post-box'>
          <div className='new-post-button-area'>
            <Button style={{width: '90%', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}
                    onClick={this.open}>Comment on this post.</Button>
          </div>
        </div>
      );
    }
  }
}

export default ReplyBox;