import React, { Component } from 'react';
import Chessboard from 'react-chessboardjs';
import Chess from 'chess.js';
import io from 'socket.io-client';


class ChessContainer extends Component {
  constructor() {
    super()
    this.state = {
      fen: 'start',
      game: new Chess(),
      status: null
    };

    this.onDrop = this.onDrop.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.chatMessage = this.chatMessage.bind(this);
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
    this.chatMessage();
  };

  onDrop(square,toSquare) {
    console.log('onDrop fired', square, toSquare);
    let move = this.state.game.move({
      from: square,
      to: toSquare,
      promotion: 'q'
    });

    if (move === null) return 'snapback';

    this.updateStatus()
  };

  changeBoard(newBoard) {
    this.setState({
      fen: newBoard
    });
    console.log('Chess newBoard received through socket');
  };

  updateStatus() {
    let status = '';

    var playerTurn = 'White';
    if (this.state.game.turn() === 'b') {
      playerTurn = 'Black';
    };

    //Checkmate?
    if (this.state.game.in_checkmate() === true) {
      status = 'Game Over, ' + playerTurn + ' is in checkmate.';
    }

    //Draw
    else if (this.state.game.in_draw() === true) {
      status = 'Game Over, it\'s a draw'
    }

    //Game still on
    else {
      status = playerTurn + ' to move';

      // check?
      if (this.state.game.in_check() === true) {
        status += ', ' + playerTurn + ' is in check';
      };
    };

    this.setState({
      status: status
    });
  };

  chatMessage() {
    const statusMessage = {
      author: 'System',
      text: this.state.status
    };

    this.socket.emit('chat', statusMessage);
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
