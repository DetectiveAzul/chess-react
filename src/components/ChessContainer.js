import React, { Component } from 'react';
import GameHelper from '../helpers/GameHelper.js';
import Chessboard from 'react-chessboardjs';
import Chess from 'chess.js';
import io from 'socket.io-client';
import config from '../config/config.js';
import ChessBoardConfigMenu from './ChessBoardConfigMenu.js';




class ChessContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fen: props.fen,
      orientation: 'w',
      game: new Chess(props.fen),
      history: props.history,
      status: null,
      gameHelper: new GameHelper(),
      id: props.id
    };

    this.onDrop = this.onDrop.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.chatMessage = this.chatMessage.bind(this);
    this.socket = io(`${config.server}`);
    this.socket.on(`chess-received-${this.state.id}`, this.changeBoard.bind(this));
    //Config functions
    this.swapOrientation = this.swapOrientation.bind(this);
    this.undoMovement = this.undoMovement.bind(this);
    this.randomMovement = this.randomMovement.bind(this);

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

    this.updateHistory()
    this.updateStatus()
  };

  updateHistory() {
    const oldBoard = this.state.fen;
    const newHistory = this.state.history;
    newHistory.push(oldBoard);
    this.setState({
      history: newHistory
    });

  }

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
    this.socket.emit('chess-moved', {
      fen:this.state.game.fen(),
      id:this.state.id,
      history: this.state.history
    });
    this.chatMessage();
  };

  chatMessage() {
    const statusMessage = {
      author: 'System',
      text: this.state.status,
      id: this.state.id
    };

    this.socket.emit('chat', statusMessage);
  };



  changeBoard(chessObject) {
    this.setState({
      fen: chessObject.fen,
      history: chessObject.history
    });
    this.state.game.load(chessObject.fen);
    this.state.gameHelper.save(this.state);

  };

  ///Config menu functions
  swapOrientation() {
    console.log('Swapping orientation');
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

  getPreviousMovement() {
    return this.state.history.pop();
  };

  undoMovement() {
    const previousMovement = this.getPreviousMovement();
    if (previousMovement) {
      this.state.game.load(previousMovement);
      this.onMoveEnd();
    };
  };

  randomMovement() {
    const possibleMoves = this.state.game.moves();
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    this.state.game.move(possibleMoves[randomIndex]);
    this.updateHistory();
    this.onMoveEnd();
  }

  render() {
    return(
      <div className='chess-container'>
        <Chessboard
          fen={this.state.fen}
          orientation={this.state.orientation}
          onDrop={this.onDrop}
          onMoveEnd={this.onMoveEnd}
        />
        <ChessBoardConfigMenu
          swapOrientation={this.swapOrientation}
          undoMovement={this.undoMovement}
          randomMovement={this.randomMovement}
        />
      </div>
    );
  }


};

export default ChessContainer;