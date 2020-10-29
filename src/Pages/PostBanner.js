import React from 'react';
import '../styles/style.css'

const PostBanner = ({title, author, index, goToPost}) => {
  return (
    <div className='post-banner-rect'>
      <div className='post-banner-text'>
        <h4 onClick={() => goToPost(index)} className='link'>{title}</h4>
        <div className='right'>
          <h4 className='link'>{author}</h4>
        </div>
      </div>
    </div>
  );
};

export default PostBanner;