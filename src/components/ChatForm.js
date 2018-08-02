import React from 'react';

const ChatForm = (props) => {
  return(
    <form className='chat-form'>
      <input type='text' placeholder='Enter your name' onKeyUp={props.nameKeyUp}/>
      <input type='text' placeholder='Type something witty' onKeyUp={props.msgKeyUp}/>
      <input type='submit' name='submit' value='Send Message' />
    </form>
  );
};

export default ChatForm;
