import React, {Component} from 'react';
import axios from "axios";

class ViewPost extends Component {

  constructor(props){
    super(props);

    this.state = {
      loading: true,
      post: null,
    };

    this.getPost();
  }

  getPost = () => {
    axios.get(`http://10.0.0.97:3001/post/${this.props.postID}`).then(response => {
      //console.log(response.data[0]['Title']);
      this.setState({
        post: response.data,
        loading: false,
      });
    }).catch(error => {
      console.log(error);
    });
  };

  render(){
    if(!this.state.loading){
      return(
        <div className='view-post-full-rect'>
          <div className='post-banner-rect'>
            <div className='post-banner-text'>
              <h4>{this.state.post[0]['Title']}</h4>
              <div className='right'>
                <a><h4>{this.state.post[0]['Author']}</h4></a>
              </div>
            </div>
          </div>

          <div className='view-post-body-rect'>
            <div className='view-post-body-text'>
              <h5>{this.state.post[0]['Body']}</h5>
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div/>
      )
    }
  }

}

export default ViewPost;