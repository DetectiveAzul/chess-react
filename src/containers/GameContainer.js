import React, { Component } from 'react';
import ChatContainer from '../components/ChatContainer.js';
import ChessContainer from '../components/ChessContainer.js';

class GameContainer extends Component {
  constructor() {
    super();
    this.state = {
      orientation: 'b'
    };
    this.swapOrientation = this.swapOrientation.bind(this);
  };

  swapOrientation() {
    if (this.state.orientation === 'w') {
      this.setState({
        orientation: 'b'
      });
    } else {
      this.setState({
        orientation: 'w'
      });
    };
  };


  render() {
    return (
      <div className="Game">
        <div className="chess-container">
          <ChessContainer
            id={this.props.id}
            fen={this.props.fen}
            orientation={this.state.orientation} />

        </div>
        <ChatContainer id={this.props.id} />

      </div>
    );
  }
}

export default GameContainer;
