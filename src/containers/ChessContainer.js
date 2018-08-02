import React, { Component } from 'react';
import Chessboard from 'react-chessboardjs';
import io from 'socket.io-client';


class ChessContainer extends Component {
  constructor() {
    super()
    this.state = {
      fen: 'start'
    };

    this.socket = io('localhost:3001');
    this.socket.on('chess-received', this.changeBoard.bind(this));
    this.chessMove = this.chessMove.bind(this);
  };

  changeBoard(newBoard) {
    this.setState({
      fen: newBoard
    });
    console.log('Chess newBoard received through socket');
  };

  chessMove(oldPos, newPos) {
    console.log('onMoveEnd fired', oldPos, newPos);
    this.socket.emit('chess-moved', newPos);
  }

  render() {
    return(
      <div className='chess-container'>
        <Chessboard
          onMoveEnd={this.chessMove}
          fen={this.state.fen}
        />
      </div>
    );
  }


};

export default ChessContainer;
