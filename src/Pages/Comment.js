import React from 'react';
import '../styles/style.css'
import {Button, Form, Input} from "reactstrap";

const Comment = ({i, commentIsOpen, body, author, goToAuthor, timePosted, offset, openReply, submitReply}) => {
  return (
    <div className='comment-rect' style={{marginLeft: offset * 20 + 'px'}}>
      <div className='comment-text'>
        <h5>{body}</h5>
        <div className='right'>
          <h5 className='link'>{author}</h5>
        </div>
      </div>
      <div className='comment-reply'>
        <button className='link' onClick={() => openReply(i)}><p style={{height: '25px', margin: '0', padding: '0'}}>Reply</p></button>
      </div>
      {commentIsOpen
        ?
        <div className='comment-text-area'>
          <Form onSubmit={submitReply}>
            <Input id='reply' style={{padding: '0', margin: '0', height: '100px'}} size='sm' type='textarea'/>
            <Button style={{textAlign: 'center', marginTop: '10px', width: '100%', color: 'white', backgroundColor: '#365090', borderRadius: '6px', borderColor: 'black', borderStyle: 'solid', borderWidth: '0 2px 2px 0'}}>Submit Reply</Button>
          </Form>
        </div>
        :
        <div/>
      }
    </div>
  );
};

export default Comment;