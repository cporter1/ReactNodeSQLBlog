import React from 'react';
import '../styles/style.css'

const PostBanner = ({title, author, index, goToPost, goToAuthor}) => {
  return (
    <div className='post-banner-rect border-custom'>
      <div className='post-banner-text'>
        <h4 onClick={() => goToPost(index)} className='link'>{title}</h4>
        <div className='right'>
          <h4 onClick={() => goToAuthor(index)} className='link'>{author}</h4>
        </div>
      </div>
    </div>
  );
};

export default PostBanner;