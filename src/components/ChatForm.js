import React from 'react';

const ChatForm = (props) => {


    return(
      <form className='chat-form' onSubmit={props.submitForm}>
        <input type='text'
          className='chat-input'
          placeholder='Name'
          onKeyUp={props.nameKeyUp}
          required />
        <input
          className='chat-input'
          type='text'
          name='msg-field'
          placeholder='Message'
          onKeyUp={props.msgKeyUp}
          required />
        <input
          className='chat-input'
          type='submit'
          name='submit'
          value='Send' />
      </form>
   );

};

export default ChatForm;
