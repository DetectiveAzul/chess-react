import React, { Component } from 'react';
import GameHelper from '../helpers/GameHelper.js';
import Chessboard from 'react-chessboardjs';
import Chess from '../libraries/chess.js/chess.js';
import io from 'socket.io-client';
import config from '../config/config.js';
import ChessBoardConfigMenu from './ChessBoardConfigMenu.js';
import ReactNotifications from 'react-browser-notifications';
import ChessAI from '../models/ChessAI.js';


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
      id: props.id,
      finished: props.finished,
      ai: props.ai,
      aiDifficulty: props.aiDifficulty
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
    this.setAi = this.setAi.bind(this);
    this.setAiDifficulty = this.setAiDifficulty.bind(this);
    //Notifications
    this.showNotifications = this.showNotifications.bind(this);


  };

  componentWillMount() {
    this.updateStatus();
  };

  componentDidMount() {
    this.chatMessage(`Player joined - ${this.state.status}`);
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

    this.updateHistory();
    this.updateStatus();
    this.chatMessage(`Moved from ${square} to ${toSquare}`);
    this.chatMessage(this.state.status);
    if (!this.state.ai) this.showNotifications();
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
      this.setState({finished: true});
    }

    //Draw
    else if (this.state.game.in_draw() === true) {
      status = 'Game Over, it\'s a draw'
      this.setState({finished: true});
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
  };

  chatMessage(message) {
    const statusMessage = {
      text: `${message}`,
      id: this.state.id
    };

    this.socket.emit('system', statusMessage);
  };



  changeBoard(chessObject) {
    this.setState({
      fen: chessObject.fen,
      history: chessObject.history
    });
    this.state.game.load(chessObject.fen);
    this.state.gameHelper.save(this.state);
    //Check if AI is true and trigger its movement
    if (this.state.ai && this.state.game.turn() === 'b') this.aiMovement();
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
    this.chatMessage('Move undone');
  };

  setAi() {
    const newAi = !this.state.ai
    console.log(newAi);
    this.setState({
      ai: newAi
    });
  };

  setAiDifficulty(number) {
    this.setState({
      aiDifficulty: parseInt(number)
    });
  };

  aiMovement() {
    const AI = new ChessAI();
    const aiMove = AI.minimaxRoot(this.state.aiDifficulty, this.state.game, true);
    console.log('Deep AI Level:', this.state.aiDifficulty);
    this.state.game.move(aiMove);
    this.updateHistory();
    this.updateStatus();
    this.onMoveEnd();
    this.chatMessage(`CPU: ${aiMove}`);
    this.chatMessage(this.state.status);

  }

  //Notifications
  showNotifications() {
    // If the Notifications API is supported by the browser
    // then show the notification
    if(this.n.supported()) this.n.show();
  }

  notificationClick(event) {
    // Do something here such as
    // console.log("Notification Clicked") OR
    // window.focus() OR
    // window.open("http://www.google.com")
    console.log('Notification clicked!');
    // Lastly, Close the notification
    this.n.close(event.target.tag);
  }

  render() {
    return(
      <div className='chess-container'>
        <ReactNotifications
         onRef={ref => (this.n = ref)} // Required
         title={this.state.status} // Required
         body=" "
         icon="devices-logo.png"
         tag="abcdef"
         timeout="2000"
         onClick={event => this.notificationClick(event)}
       />
        <Chessboard
          width='100%'
          fen={this.state.fen}
          orientation={this.state.orientation}
          onDrop={this.onDrop}
          onMoveEnd={this.onMoveEnd}
          isDraggable={!this.state.finished}
        />
        <ChessBoardConfigMenu
          swapOrientation={this.swapOrientation}
          undoMovement={this.undoMovement}
          setAi={this.setAi}
          aiState={`${this.state.ai}`}
          setAiDifficulty={this.setAiDifficulty}
          aiDifficulty={this.state.aiDifficulty}
        />
      </div>
    );
  }


};

export default ChessContainer;
