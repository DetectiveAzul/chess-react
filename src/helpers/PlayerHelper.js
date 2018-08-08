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

  checkForAccount(player) {
    const request = new RequestHelper(`${config.serverPlayer}`);
    request.get()
      .then((playersData) => {
        if (playersData.find((playerData) => {
          return playerData.account === player.account
        })) {
          alert(`Account ${player.account} already exists`);
        } else {
          this.createAccount(player);
          alert(`Account ${player.account} successfully created!`);
        };
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
