import React, { Component } from 'react';
import './app.css';
import LobbyContainer from './containers/LobbyContainer.js';
import GameContainer from './containers/GameContainer.js';
import RequestHelper from './helpers/RequestHelper.js';
import config from './config/config.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: null,
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
        history: [],
        finished: false,
        ai: false,
        aiDifficulty: 1
      }
    }).then((gamesData) => {
      gamesData.reverse();
        this.setState({
        view: <GameContainer
          id={gamesData[0]._id}
          fen={gamesData[0].fen}
          history={gamesData[0].history}
          finished={false}
          ai={false}
          aiDifficulty='1'
          // Database inversion (MLab)
          // id={gamesData[gamesData.length -1]._id}
          // fen={gamesData[gamesData.length -1].fen}
          // history={gamesData[gamesData.length -1].history}
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
            finished={gameData[0].finished}
            ai={gameData[0].ai}
            aiDifficulty={gameData[0].aiDifficulty}
          />
        });
      });
  };

  //render method
  render() {
    return (
      <div className="App">
        <div className='header'>
        </div>
        {this.state.view}
      </div>
    );
  }
}

export default App;
