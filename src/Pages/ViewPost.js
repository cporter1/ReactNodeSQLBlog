import React, {Component} from 'react';
import axios from "axios";
import {Label} from "reactstrap";
import Comment from './Comment';
import ReplyBox from './ReplyBox';

class ViewPost extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      post: null,
      bodyExists: true,
      username: this.props.username,
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    axios.get(`http://10.0.0.97:3001/post/${this.props.postID}`).then(response => {
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
    axios.get(`http://10.0.0.97:3001/comments/${this.props.postID}`).then(response => {
      this.setState({
        comments: response.data,
        loading: false,
      });
    }).catch(error => {
      console.log(error);
    });
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
                    <h4 className='link'>{this.state.post[0]['Author']}</h4>
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

            <ReplyBox postID={this.state.post[0]['PostID']} username={this.props.username}/>

          </div>
          <div className='page-divider'>
              <b style={{padding: '10px', marginLeft: '20px', color: 'white', marginBottom: '0'}}>Comments</b>
          </div>

          {this.state.comments.map((key, index) => {
            return (
              <Comment key={index} body={this.state.comments[index]['Body']} author={this.state.comments[index]['Author']}/>
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