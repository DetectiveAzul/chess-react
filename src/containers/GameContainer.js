import React, { Component } from 'react';
import ChatContainer from './ChatContainer.js';
import ChessContainer from './ChessContainer.js';

class GameContainer extends Component {

  render() {
    return (
      <div className="Game">

        <ChessContainer id={this.props.id} fen={this.props.fen} />
        <ChatContainer  />

      </div>
    );
  }
}

export default GameContainer;
