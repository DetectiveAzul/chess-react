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
    
    this.onDrop = this.onDrop.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.socket = io('localhost:3001');
    this.socket.on('chess-received', this.changeBoard.bind(this));

  };

  //Initial setting will be here
  componentDidMount() {

  }

  //Events
  onMoveEnd() {
    console.log('onMoveEnd fired')
    this.socket.emit('chess-moved', this.state.game.fen());
  };

  onDrop(square,toSquare) {
    console.log('onDrop fired', square, toSquare);
    let move = this.state.game.move({
      from: square,
      to: toSquare,
      promotion: 'q'
    });

    if (move === null) return 'snapback';
  };

  changeBoard(newBoard) {
    this.setState({
      fen: newBoard
    });
    console.log('Chess newBoard received through socket');
  };


  render() {
    return(
      <div className='chess-container'>
        <Chessboard
          onMoveEnd={this.onMoveEnd}
          onDrop={this.onDrop}
          fen={this.state.fen}
        />
      </div>
    );
  }


};

export default ChessContainer;
