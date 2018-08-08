import React, { Component } from 'react';
import SystemMessage from './SystemMessage.js';
import io from 'socket.io-client';
import config from '../config/config.js';

class SystemChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      id: props.id
    };
    this.socket = io(`${config.server}`);
    this.socket.on(`system-${this.state.id}`, this.addMessage.bind(this));
  };

  addMessage(message) {
    const messages = this.state.messages;
    const newMessages = [message, ...messages];
    this.setState({
      messages: newMessages
    });
  };

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <SystemMessage key={index} text={message.text} />
    });


    return(
    <div className = 'system-chat-container'>
      <div className = 'system-messages-container'>
        {messages}
      </div>
    </div>
  )};

};

export default SystemChatContainer;
