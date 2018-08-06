import React, {Component} from 'react';
import RequestHelper from '../helpers/RequestHelper.js';
import GameSavedEntry from '../components/GameSavedEntry.js';
import NewGameEntry from '../components/NewGameEntry.js';
import config from '../config/config.js';


class LobbyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    }
  }

  componentWillMount() {
    const request = new RequestHelper(`${config.serverGame}`);
    request.get()
      .then( (gamesData) => {
        const games = gamesData.map((gameData, index) => {
          return <GameSavedEntry
            key={index}
            id={gameData._id}
            fen={gameData.fen}
            loadGame = {this.props.loadGame}
           />
        });
        games.reverse();
        this.setState({games: games});
      })
  }



  render() {
    return(
      <div className='lobby-container'>
      <NewGameEntry newGame = {this.props.newGame} />
      {this.state.games}
      </div>

    )
  }
}

export default LobbyContainer;
