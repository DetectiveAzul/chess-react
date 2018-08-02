import React, {Component} from 'react';

class ChatForm extends Component {

  constructor(props) {
    super(props);

  };

  render() {
    return(
      <form className='chat-form' onSubmit={this.props.submitForm}>
        <input type='text'
          placeholder='Enter your name'
          onKeyUp={this.props.nameKeyUp}
          required />
        <input
          type='text'
          name='msg-field'
          placeholder='Type something witty'
          onKeyUp={this.props.msgKeyUp}
          required />
        <input
          type='submit'
          name='submit'
          value='Send Message' />
      </form>
   )};

};

export default ChatForm;
