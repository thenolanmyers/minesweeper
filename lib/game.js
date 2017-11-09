'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = require('./board');
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

var Game = function () {
  /**
   * constructor
   * @param {number} rows in game board
   * @param {number} cols in game board
   * @param {number} bombs to randomly place
   */
  function Game(rows, cols, bombs) {
    _classCallCheck(this, Game);

    this._board = new Board(rows, cols, bombs);
  }

  _createClass(Game, [{
    key: 'playMove',


    /**
     * Make a move for specified row and column
     * @param {number} r = row
     * @param {number} c = column
     */
    value: function playMove(r, c) {
      console.assert(this.board.flipTile(r, c), "Flip failed");

      if (this.board.playerBoard[r][c] === 'B') {
        console.log("You Lose! " + r + ", " + c);
      } else if (!this.board.hasSafeTiles()) {
        console.log("You Win!");
      } else {
        console.log('Flipped ' + r + ', ' + c);
      }
      this.board.print();
    }
  }, {
    key: 'board',
    get: function get() {
      return this._board;
    }
  }]);

  return Game;
}();

module.exports = Game;