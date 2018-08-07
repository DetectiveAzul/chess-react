import RequestHelper from './RequestHelper.js';
import config from '../config/config.js';


class PlayerHelper {

  //This create the payload used for post and put
  createPayload(player) {
    return {
      playerData: {
        account: player.account,
        password: player.password,
        games: player.games
      }
    };
  };

};



export default PlayerHelper;
