import React, { Component } from 'react';
import './app.css';
import LobbyContainer from './containers/LobbyContainer.js';
import GameContainer from './containers/GameContainer.js';
import RequestHelper from './helpers/RequestHelper.js';
import Player from './models/Player.js';
import PlayerForm from './components/PlayerForm.js';
import PlayerHelper from './helpers/PlayerHelper.js';
import config from './config/config.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: null,
      player: null,
      playerHelper: new PlayerHelper()
    }

    this.loadGame = this.loadGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    this.setState({
      view: <LobbyContainer loadGame={this.loadGame} newGame={this.newGame} />
    });
  };

  //Game creation functions
  newGame() {
    const request = new RequestHelper(`${config.serverGame}`);
    request.post({
      gameData: {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        history: []
      }
    }).then((gamesData) => {
      gamesData.reverse();
        this.setState({
        view: <GameContainer
          id={gamesData[0]._id}
          fen={gamesData[0].fen}
          history={gamesData[0].history}
        />
      });

    });
  };

  loadGame(id) {
    const request = new RequestHelper(`${config.serverGame}/${id}`);
    request.get()
      .then((gameData) => {
        this.setState({
          view: <GameContainer
            id={id}
            fen={gameData[0].fen}
            history={gameData[0].history}
          />
        });
      });
  };

  //player auth methods
  signIn(player) {
    this.state.playerHelper.checkForAccount(player);
  };


  logIn(player) {
    const request = new RequestHelper(`${config.serverPlayer}/${player.account}`);
    request.get()
      .then((playerData) => {
        if (playerData[0] && playerData[0].password === player.password) {
          this.setState({
            player: playerData[0]
          });
        } else {
          alert('Password or Account are incorrect');
        };
      });
  };


  //render method
  render() {
    return (
      <div className="App">
        <div className='header'>
          <PlayerForm signIn = {this.signIn} logIn = {this.logIn} />
        </div>
        {this.state.view}
      </div>
    );
  }
}

export default App;
