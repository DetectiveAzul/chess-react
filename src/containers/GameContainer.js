import React, { Component } from 'react';
import ChatContainer from '../components/ChatContainer.js';
import ChessContainer from '../components/ChessContainer.js';

class GameContainer extends Component {

  render() {
    return (
      <div className="Game">
        <ChessContainer
          id={this.props.id}
          fen={this.props.fen}
          history={this.props.history}
        />
        <ChatContainer id={this.props.id} />
      </div>
    );
  }
}

export default GameContainer;
