import React, {Component} from 'react';
import RequestHelper from '../helpers/RequestHelper.js';
import GameSavedEntry from '../components/GameSavedEntry.js';

class LobbyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    }
  }

  componentWillMount() {
    const request = new RequestHelper('http://localhost:3001/games');
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
        this.setState({games: games});
      })
  }



  render() {
    return(
      <div className='lobby-container'>
      {this.state.games}
      </div>
    )
  }
}

export default LobbyContainer;