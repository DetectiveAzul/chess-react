import React, { Component } from 'react';
import ChatForm from '../components/ChatForm.js';
import Message from '../components/Message.js';
import io from 'socket.io-client';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      name: null,
      msg: null
    };
    this.socket = io('https://server-bkztjzrngb.now.sh/');
    this.socket.on('chat', this.addMessage.bind(this));

    this.nameKeyUp = this.nameKeyUp.bind(this);
    this.msgKeyUp = this.msgKeyUp.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
  };

  addMessage(message) {
    const messages = this.state.messages;
    const newMessages = [message, ...messages];
    this.setState({
      messages: newMessages
    });
  };

  submitForm(event) {
    event.preventDefault();

    //Make sure we don't send an empty message
    if (this.state.name && this.state.msg) {
      const newMessage = {author: this.state.name, text: this.state.msg };
      this.socket.emit('chat', newMessage);

    };
  };

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <Message key={index} author={message.author} text={message.text} />
    });


    return(
    <div className = 'chat-container'>
      <ChatForm
        nameKeyUp = {this.nameKeyUp}
        msgKeyUp = {this.msgKeyUp}
        submitForm = {this.submitForm}
      />
      {messages}
    </div>
  )};

};

export default ChatContainer;
