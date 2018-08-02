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

    this.nameKeyUp = this.nameKeyUp.bind(this);
    this.msgKeyUp = this.msgKeyUp.bind(this);
  };

  nameKeyUp(event) {
    this.setState({
      name: event.target.value
    });
  };

  msgKeyUp(event) {
    this.setState({
      msg: event.target.value
    });
  }

  render() {
    return(
    <div className = 'chat-container'>
      <ChatForm
        nameKeyUp = {this.nameKeyUp}
        msgKeyUp = {this.msgKeyUp}
      />
    </div>
  )};

};

export default ChatContainer;
