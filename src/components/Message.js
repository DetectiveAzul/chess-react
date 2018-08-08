import React from 'react';

const Message = ({ author, text }) => {
  return (
    <div className='message'>
      <p className='author'>{author}:</p>
      <p className='text'>{text}</p>
    </div>
  );
};

export default Message;
