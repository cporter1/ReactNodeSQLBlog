import React from 'react';
import '../styles/style.css'
import img_unclicked from '../data/upvote_unclicked.png'
import img_clicked from '../data/upvote_clicked.png'

const PostBanner = ({title, author, index, goToPost, goToAuthor, upvotes, onUpvote, isUpvoted}) => {
  return (
    <div className='post-banner-rect border-custom'>
      <div className='post-banner-text'>
        <h4>{upvotes}</h4>
        <div style={{width: '0.75em'}}/>
        {isUpvoted
          ?
          <img src={img_clicked} onClick={() => onUpvote(index)} style={{marginTop: '7px', height: '15px', width: '25px'}} alt='Unclicked'/>
          :
          <img src={img_unclicked} onClick={() => onUpvote(index)} style={{marginTop: '7px', height: '15px', width: '25px'}} alt='Unclicked'/>
        }
        <div style={{width: '1em'}}/>
        <h4 onClick={() => goToPost(index)} className='link'>{title}</h4>
        <div className='right'>
          <h4 onClick={() => goToAuthor(index)} className='link'>{author}</h4>
        </div>
      </div>
    </div>
  );
};

export default PostBanner;