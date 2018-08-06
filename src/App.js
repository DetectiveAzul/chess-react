import React, { Component } from 'react';
import './app.css';
import LobbyContainer from './containers/LobbyContainer.js';
import GameContainer from './containers/GameContainer.js';
import RequestHelper from './helpers/RequestHelper.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: null
    }

    this.loadGame = this.loadGame.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    this.setState({
      view: <LobbyContainer loadGame={this.loadGame} newGame={this.newGame} />
    });
  };


  loadGame(id) {
    const request = new RequestHelper(`http://localhost:3001/games/${id}`);
    request.get()
      .then((gameData) => {
        this.setState({
          view: <GameContainer id={id} fen={gameData[0].fen} />
        });
      });
  };

  newGame() {
    const request = new RequestHelper(`http://localhost:3001/games`);
    request.post({
      gameData: {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      }
    }).then((gamesData) => {
        this.setState({
        view: <GameContainer id={gamesData[gamesData.length -1]._id} />
      });

    });
  };

  render() {
    return (
      <div className="App">
        {this.state.view}
      </div>
    );
  }
}

export default App;
