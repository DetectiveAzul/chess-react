import React, { Component } from 'react';
import GameHelper from '../helpers/GameHelper.js';
import Chessboard from 'react-chessboardjs';
import Chess from 'chess.js';
import io from 'socket.io-client';


class ChessContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fen: props.fen,
      game: new Chess(props.fen),
      status: null,
      gameHelper: new GameHelper(),
      id: props.id
    };

    this.onDrop = this.onDrop.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.chatMessage = this.chatMessage.bind(this);
    this.socket = io('localhost:3001');
    this.socket.on(`chess-received-${this.state.id}`, this.changeBoard.bind(this));

  };

  componentWillMount() {
    this.updateStatus();
  };

  componentDidMount() {
    this.chatMessage();
  };

  //Events

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


  onMoveEnd() {
    console.log('onMoveEnd fired')
    this.socket.emit('chess-moved', {fen:this.state.game.fen(), id:this.state.id});
    this.chatMessage();
    this.state.gameHelper.save(this.state);
  };

  chatMessage() {
    const statusMessage = {
      author: 'System',
      text: this.state.status,
      id: this.state.id
    };

    this.socket.emit('chat', statusMessage);
  };

  changeBoard(newBoard) {
    this.setState({
      fen: newBoard
    });
    this.state.game.load(newBoard);
  };


  render() {
    return(
      <div className='chess-container'>
        <Chessboard
          fen={this.state.fen}
          onDrop={this.onDrop}
          onMoveEnd={this.onMoveEnd}
        />
      </div>
    );
  }


};

export default ChessContainer;
