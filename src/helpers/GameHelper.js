import RequestHelper from './RequestHelper.js';

class GameHelper {

  //Create new entry on the database with the initial status of the game
  //Then return the id for loading/updating purposes
  create(state) {
    const request = new RequestHelper('http://localhost:3001/games');
    const payload = {
      gameData: {
        fen: state.game.fen(),
        turn: state.game.turn()
      }
    };

    request.post(payload)
      .then((res) => {
        const savedGame = res.pop();
        state.id = `${savedGame["_id"]}`;
        console.log(`Game ID: ${state.id} created`);
      });
  };


  save(state) {
    const request = new RequestHelper(`http://localhost:3001/games/${state.id}`);
    const payload = {
      gameData: {
        fen: state.game.fen(),
        turn: state.game.turn()
      }
    };

    request.put(payload)
      .then(() => console.log('Game Saved'))
  };

};

export default GameHelper;
