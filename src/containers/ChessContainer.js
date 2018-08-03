import React, { Component } from 'react';
import Chessboard from 'react-chessboardjs';
import Chess from 'chess.js';
import io from 'socket.io-client';


class ChessContainer extends Component {
  constructor() {
    super()
    this.state = {
      fen: 'start',
      game: new Chess()
    };

    // this.socket = io('localhost:3001');
    // this.socket.on('chess-received', this.changeBoard.bind(this));
    this.onMoveEnd = this.onMoveEnd.bind(this);
  };

  //Initial setting will be here
  componentDidMount() {

  }

  // changeBoard(newBoard) {
  //   this.setState({
  //     fen: newBoard
  //   });
  //   console.log('Chess newBoard received through socket');
  // };

  onMoveEnd(oldPos, newPos) {
    console.log('onMoveEnd fired', oldPos, newPos);
    // this.socket.emit('chess-moved', newPos);
  }

  render() {
    return(
      <div className='chess-container'>
        <Chessboard
          onMoveEnd={this.onMoveEnd}
          fen={this.state.fen}
        />
      </div>
    );
  }


};

export default ChessContainer;
