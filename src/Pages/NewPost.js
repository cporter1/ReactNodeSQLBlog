import React, { Component } from 'react';
import {Label, Button, InputGroupAddon, InputGroupText, Input, InputGroup, Form, Alert} from 'reactstrap';
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

  submitPost = (ev) => {
    ev.preventDefault();
    let today = new Date();
    let timePosted = today.getFullYear() + '-'
      + (today.getMonth() + 1) + '-'
      + today.getDate() + ' '
      + today.getHours() + ':'
      + today.getMinutes() + ':'
      + today.getSeconds();

    let data = JSON.stringify({
      title: ev.target.title.value,
      author: this.props.username,
      body: ev.target.body.value,
      timePosted: timePosted,
    });

    console.log(data);

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
      <div>
        <Label>Create a New Post</Label>
        <Form onSubmit={this.submitPost}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Title</InputGroupText>
            </InputGroupAddon>
            <Input id="title" type='text' placeholder="Title" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Body</InputGroupText>
            </InputGroupAddon>
            <Input type="textarea" name="textarea" id="body" />
          </InputGroup>
          <div style={{height: '0.4em'}}/>
          <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
            {this.state.error_message}
          </Alert>
          <div style={{height: '0.4em'}}/>
          <Button type='submit'>Submit Post</Button>
        </Form>
      </div>
    )
  }


}

export default NewPost;