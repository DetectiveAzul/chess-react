import React from 'react';
import './styles/Message.css';

const Message = ({ author, text }) => {
  return (
    <div className='message'>
      <p className='author'>{author}:</p>
      <p className='text'>{text}</p>
    </div>
  );
};

export default Message;
