import React, { Component } from 'react';
import {Label, Button, InputGroupAddon, InputGroupText, Input, InputGroup, Form, Alert} from 'reactstrap';
import axios from "axios";
import history from "../history";
import { Editor } from '@tinymce/tinymce-react';

class NewPost extends Component {

  constructor(props){
    super(props);

    this.state = {
      error_message: '',
      error_visible: false,
    };
  }

  getNewCode = () => {
    return [...Array(8)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
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

    title = title.replace("'", "''");
    body = body.replace("'", "''");

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

  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  render(){
    return(
      <div className='NewPost'>
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

        <div style={{height: '0.4em'}}/>

        <Editor
          apiKey='eo1bupzvob80fnuz2iky51mtcakgv8coz2tpamlt4coapd24'
          initialValue='Hello'
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={this.handleEditorChange}
          />
      </div>
    )
  }


}

export default NewPost;