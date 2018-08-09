import React, {Component} from 'react';
import RequestHelper from '../helpers/RequestHelper.js';
import GameSavedEntry from '../components/GameSavedEntry.js';
import NewGameEntry from '../components/NewGameEntry.js';
import DeleteGameEntry from '../components/DeleteGameEntry.js';
import config from '../config/config.js';
import './styles/LobbyContainer.css';


class LobbyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    }

    this.deleteGame = this.deleteGame.bind(this);
  }

  componentDidMount() {
    this.getSavedGames();
  }

  getSavedGames() {
    const request = new RequestHelper(`${config.serverGame}`);
    request.get()
      .then( (gamesData) => {
        const games = gamesData.map((gameData, index) => {
          if (!gameData.finished) {
            return <GameSavedEntry
              key={index}
              id={gameData._id}
              fen={gameData.fen}
              loadGame = {this.props.loadGame}
             />
          }
        });
        games.reverse();
        this.setState({games: games});
      });
  };

  deleteGame(id) {
    const request = new RequestHelper(`${config.serverGame}`);
    request.delete(id)
      .then( () => this.getSavedGames());
  }

  render() {
    return(
      <div className='lobby-container'>
        <div className='lobby-menu'>
          <NewGameEntry newGame = {this.props.newGame} />
          <DeleteGameEntry deleteGame = {this.deleteGame} />
        </div>
        <div className='game-list'>
          {this.state.games}
        </div>
      </div>

    )
  }
}

export default LobbyContainer;
