import React, {Component} from 'react';
import { Table } from 'reactstrap';
import axios from "axios";

class PostTable extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: []
    };

    this.loadPosts();
  }

  goToPost = () => {

  };

  loadPosts = () => {
    axios.get('http://10.0.0.97:3001/getPosts').then(response => {
      //console.log(response.data[0]['Title']);
      this.setState({posts: response.data});
    }).catch(error => {
      console.log(error);
    });
  };

  render(){
    return (
      <Table dark borderless hover>

        {Object.keys(this.state.posts).map((key, index) => {
          return (
            <tbody key={key}>
            <tr onClick={() => this.goToPost(index)}>
              <td><h4>{this.state.posts[index]['Title']}</h4></td>
              <td><h4>{this.state.posts[index]['Author']}</h4></td>
            </tr>
            </tbody>
          );
        })}

      </Table>
    );
  }

};

export default PostTable;