import RequestHelper from './RequestHelper.js';
import config from '../config/config.js';


class GameHelper {

  //This create the payload used for post and put
  createPayload(state) {
    return {
      gameData: {
        fen: state.game.fen()
      }
    };
  };

  save(state) {
    const request = new RequestHelper(``${config.server}`/${state.id}`);
    const payload = this.createPayload(state);

    request.put(payload)
      .then(() => console.log('Game Saved'))
  };

};



export default GameHelper;
