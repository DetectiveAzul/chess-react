import React, { Component } from 'react';
import ChatForm from './ChatForm.js';
import Message from './Message.js';
import io from 'socket.io-client';
import config from '../config/config.js';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      name: null,
      msg: null,
      id: props.id
    };
    this.socket = io(`${config.server}`);
    this.socket.on(`chat-${this.state.id}`, this.addMessage.bind(this));

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
    event.target["msg-field"].value = "";
    //Make sure we don't send an empty message
    if (this.state.name && this.state.msg) {
      const newMessage = {author: this.state.name, text: this.state.msg, id: this.state.id};
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
      <div className = 'messages-container'>
        {messages}
      </div>
    </div>
  )};

};

export default ChatContainer;
