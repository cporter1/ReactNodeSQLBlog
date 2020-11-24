import React, { Component } from 'react';
import {Input, Button, Form} from 'reactstrap';
import axios from '../config/axios.config';
import history from "../history";
import { API_Routes } from '../api_routes';

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

    //Replaces all ' with '' for SQL Database Storage
    title = title.replace(/'/gi, "''");
    body = body.replace(/'/gi, "''");

    let data = JSON.stringify({
      title: title,
      author: this.props.username,
      body: body,
      timePosted: timePosted,
      postID: this.getNewCode(),
    });

    axios.post(`${API_Routes.API_POST_URL}/newPost`, data, {
      headers: {
        'Content-Type': 'application/json',
        'sessionCookie' : null,
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
        if(0){
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
      <div className='view-post-rect'>
        <Form onSubmit={this.submitPost}>
          <div className='new-post-title-rect'>
            <div className='new-post-title-text'>
              <h4>Title</h4>
              <Input id='title' style={{marginLeft: '10px'}} size='sm'/>
            </div>
          </div>

          <div className='view-post-body-rect'>
            <div className='new-post-body-text'>
              <h5 style={{marginRight: '10px'}}>Body</h5>
              <Input id='body' style={{marginLeft: '10px', height: '200px'}} size='sm' type='textarea'/>
              <Button style={{textAlign: 'center', marginTop: '10px', marginLeft: '10px', width: '100%', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}>Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }


}

export default NewPost;