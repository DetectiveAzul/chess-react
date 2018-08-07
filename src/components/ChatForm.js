import React from 'react';

const ChatForm = (props) => {


    return(
      <form className='chat-form' onSubmit={props.submitForm}>
        <input type='text'
          className='chat-input'
          placeholder='Enter your name'
          onKeyUp={props.nameKeyUp}
          required />
        <input
          className='chat-input'
          type='text'
          name='msg-field'
          placeholder='Type something witty'
          onKeyUp={props.msgKeyUp}
          required />
        <input
          className='chat-input'
          type='submit'
          name='submit'
          value='Send Message' />
      </form>
   );

};

export default ChatForm;
