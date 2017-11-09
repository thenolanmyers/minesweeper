const Board = require('./board');
// import {Board} from './board';

// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

/** Game class
 * Controls game function
 */
class Game {
  /**
   * constructor
   * @param {number} rows in game board
   * @param {number} cols in game board
   * @param {number} bombs to randomly place
   */
  constructor (rows, cols, bombs) {
    this._board = new Board (rows, cols, bombs);
  }

  get board () { return this._board; }

  /**
   * Make a move for specified row and column
   * @param {number} r = row
   * @param {number} c = column
   */
  playMove (r,c) {
    console.assert(this.board.flipTile(r,c), "Flip failed");

    if (this.board.playerBoard[r][c] === 'B' ) {
      console.log ("You Lose! " + r + ", " + c);
    } else if (!this.board.hasSafeTiles()) {
      console.log ("You Win!");
    } else {
      console.log (`Flipped ${r}, ${c}`);
    }
    this.board.print()
  }
}

module.exports = Game;
