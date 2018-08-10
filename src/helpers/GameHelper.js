import RequestHelper from './RequestHelper.js';
import config from '../config/config.js';


class GameHelper {

  //This create the payload used for post and put
  createPayload(state) {
    return {
      gameData: {
        fen: state.game.fen(),
        history: state.history,
        finished: state.finished,
        ai: state.ai,
        aiDifficulty: state.aiDifficulty
      }
    };
  };

  save(state) {
    const request = new RequestHelper(`${config.serverGame}/${state.id}`);
    const payload = this.createPayload(state);

    request.put(payload)
      .then(() => console.log('Game Saved'))
  };

};



export default GameHelper;
