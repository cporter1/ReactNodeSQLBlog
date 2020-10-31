import React from 'react';
import '../styles/style.css'

const Comment = ({body, author, goToAuthor, timePosted, offset}) => {
  return (
    <div className='comment-rect' style={{marginLeft: offset * 20 + 'px'}}>
      <div className='comment-text'>
        <h5>{body}</h5>
        <div className='right'>
          <h5 className='link'>{author}</h5>
        </div>
      </div>
    </div>
  );
};

export default Comment;