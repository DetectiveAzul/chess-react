import RequestHelper from './RequestHelper.js';

class GameHelper {

  //This create the payload used for post and put
  createPayload(state) {
    return {
      gameData: {
        fen: state.game.fen()
      }
    };
  };

  //Create new entry on the database with the initial status of the game
  //Then return the id for loading/updating purposes
  create(state) {
    const request = new RequestHelper('http://localhost:3001/games');
    const payload = this.createPayload(state);

    request.post(payload)
      .then((res) => {
        const savedGame = res.pop();
        state.id = `${savedGame["_id"]}`;
        console.log(`Game ID: ${state.id} created`);
      });
  };


  save(state) {
    const request = new RequestHelper(`http://localhost:3001/games/${state.id}`);
    const payload = this.createPayload(state);

    request.put(payload)
      .then(() => console.log('Game Saved'))
  };


};



export default GameHelper;
