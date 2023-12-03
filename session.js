// session.js
class Session {
    constructor(id, startDate) {
      this.id = id;
      this.startDate = startDate;
      this.players = [];
      this.game = null;
    }
  
    addPlayer(player) {
      this.players.push(player);
    }
  
    canJoin() {
        return this.players.count <= 7
    }

    startGame() {
        this.game = Game(this.players)
        this.game.isStarted = true
    }
    // You can add more methods or properties as needed
  }

  class Game {
    constructor(players) {
      this.isStarted = false;
      this.players = [];
    }
  }

  export default Session;
