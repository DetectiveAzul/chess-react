import React, { Component } from 'react';
import './app.css';
import LobbyContainer from './containers/LobbyContainer.js';
import GameContainer from './containers/GameContainer.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: null
    }

    this.loadGame = this.loadGame.bind(this);
  }

  componentDidMount() {
    this.setState({
      view: <LobbyContainer loadGame={this.loadGame} />
    });
  };


  loadGame(id, fen) {
    this.setState({
      view: <GameContainer id={id} fen={fen} />
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
