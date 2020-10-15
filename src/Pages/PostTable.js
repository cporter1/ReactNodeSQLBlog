import React, {Component} from 'react';
import { Table } from 'reactstrap';
import axios from "axios";
import history from "../history";

class PostTable extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: this.props.posts,
    };
  }

  goToPost = (index) => {
    let postID = this.getPostID(index);
    //console.log(this.state.posts);
    //console.log(postID);
    history.push(`/post/${postID}`);
    window.location.reload(false);
  };

  getPostID = (index) => {
    return this.state.posts[index]['PostID'];
  };

  render(){
    return (
      <Table dark hover striped>

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