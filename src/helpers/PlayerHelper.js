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

  //Will check if player account name is already taken
  checkAccountName(player) {
    const request = new RequestHelper(`${config.serverPlayer}`);
    request.get()
      .then((playersData) => {
        return playersData.find((playerData) => {
          return (playerData.account.toLowerCase() === player.account.toLowerCase())
        });
      });
  };

  //Will create account
  createAccount(player) {
    const request = new RequestHelper(`${config.serverPlayer}`);
    request.post(this.createPayload(player))
      .then(() => console.log('Account Created!'));
  };

  //Will update player name/password/games
  updateAccount(player) {
    const request = new RequestHelper(`${config.serverPlayer}/${player.id}`);
    request.put(this.createPayload(player))
      .then(() => console.log('Player Account updated!'));
  };



};



export default PlayerHelper;
