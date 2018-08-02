import React, { Component } from 'react';
import ChatForm from '../components/ChatForm.js';
import io from 'socket.io-client';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      name: null,
      msg: null
    };
  };

  render() {
    return(
    <div className = 'chat-container'>
      <ChatForm />
    </div>
  )};

};

export default ChatContainer;
