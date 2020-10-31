import React from 'react';
import '../styles/style.css';
import {Button} from "reactstrap";

const NewPostBox = ({newTextPost, newLinkPost}) => {
  return (
    <div className='new-post-box'>
      <div className='new-post-button-area'>
        <Button style={{width: '90%', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}
                onClick={newTextPost}> Create new text post.</Button>
        <div style={{height: '10px'}}/>
        <Button style={{width: '90%', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}
                onClick={newLinkPost}> Create new link post.</Button>
      </div>
    </div>
  );
};

export default NewPostBox;