import React, {Component} from 'react';

class ChatForm extends Component {

  render() {
    return(
      <form className='chat-form' onSubmit={this.props.submitForm}>
        <input type='text'
          className='chat-input'
          placeholder='Enter your name'
          onKeyUp={this.props.nameKeyUp}
          required />
        <input
          className='chat-input'
          type='text'
          name='msg-field'
          placeholder='Type something witty'
          onKeyUp={this.props.msgKeyUp}
          required />
        <input
          className='chat-input'
          type='submit'
          name='submit'
          value='Send Message' />
      </form>
   )};

};

export default ChatForm;
