import {Board} from './board';

/** Game class
 * Controls game function
 */
export class Game {
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
