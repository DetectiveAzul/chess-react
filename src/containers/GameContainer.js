import React, { Component } from 'react';
import ChatContainer from '../components/ChatContainer.js';
import ChessContainer from '../components/ChessContainer.js';
import './styles/GameContainer.css';

class GameContainer extends Component {

  render() {
    return (
      <div className="Game">
        <ChessContainer
          id={this.props.id}
          fen={this.props.fen}
          history={this.props.history}
          ai={this.props.ai}
          finished={this.props.finished}
        />
        <ChatContainer id={this.props.id} />
      </div>
    );
  }
}

export default GameContainer;
