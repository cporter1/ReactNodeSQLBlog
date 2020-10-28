import React from 'react';
import '../styles/style.css'

const PostBanner = ({title, author, index, goToPost}) => {
  return (
    <div className='post-banner-rect'>
      <div className='post-banner-text'>
        <a onClick={() => goToPost(index)}><h4>{title}</h4></a>
        <div className='right'>
          <a><h4>{author}</h4></a>
        </div>
      </div>
    </div>
  );
};

export default PostBanner;