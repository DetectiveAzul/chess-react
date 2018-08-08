class Player {
  constructor(details, games = []) {
    this.account = details.accountName.value;
    this.password = details.accountPassword.value;
    this.games = games;
  }

}

export default Player;
