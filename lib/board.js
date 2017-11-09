'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(rows, cols, bombs) {
    _classCallCheck(this, Board);

    this._numBombs = bombs;
    this._numTiles = rows * cols;
    this._playerBoard = Board.generatePlayerBoard(rows, cols);
    this._bombBoard = Board.generateBombBoard(rows, cols, bombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    /**
     * Flips specified Tile
     * @param {number} row
     * @param {number} col
     * @returns {Boolean} whether the flip happened
     */
    value: function flipTile(row, col) {
      if (this._playerBoard[row][col] !== ' ') {
        console.log('Tile has already been flipped: (' + row + ", " + col + ")");
        return false;
      } else if (this._bombBoard[row][col] === 'B') {
        this._playerBoard[row][col] = 'B';
      } else {
        this._playerBoard[row][col] = this.getNumberOfNeighborBombs(row, col);
      }
      // console.log(this._numTiles);
      this._numTiles--;
      return true;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(row, col) {
      var _this = this;

      var neighborOffsets = [];

      // console.log(`Counting neighbors: ${row}, ${col}`);
      // this.print('playerBoard');
      // this.print('bombBoard');

      // Create array with all adjacent indices to row, col
      // Add a neighbor for each row and column +/- 1 from index
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          neighborOffsets.push([row + i, col + j]);
        }
      }

      // Count bombs among all offsets
      var bombCount = 0;
      neighborOffsets.forEach(function (offset) {
        var i = offset[0];
        var j = offset[1];

        // But only if in range of the board
        if (i >= 0 && i < _this._bombBoard.length && j >= 0 && j < _this._bombBoard[0].length) {
          // console.log(`Checking ${i}, ${j}`);
          if (_this._bombBoard[i][j] === 'B') bombCount++;
        }
      });

      return bombCount;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      // console.log (this._numTiles !== this._numBombs);
      return this._numTiles !== this._numBombs;
    }
  }, {
    key: 'print',
    value: function print(boardName, debugMode) {
      // optional parameters
      // Default to playerBoard and debugMode off if not specified
      var title = boardName ? boardName + ':' : 'Player board:';
      boardName = boardName ? boardName : 'playerBoard';
      debugMode = debugMode ? debugMode : false;
      var board = [];

      // If in debugMode add a header row and column to a copy of the board before printing
      // Header row will be on top; header column on the right side (easier to read than left side)
      if (debugMode) {
        board = Board.copy(this[boardName]);
        // Create a header row and prepend it to the board
        var rowHead = [];
        for (var i = 0; i < board[0].length; i++) {
          rowHead.push(i);
        }
        board.unshift(rowHead);

        // Add a header column to each row on the board
        var rowCounter = -1; // accommodate the header row
        board.forEach(function (row) {
          if (rowCounter === -1) {
            row.push('*'); // for upper right corner
            rowCounter++;
          } else {
            row.push(rowCounter++);
          }
        });
      } else {
        board = this[boardName];
      }

      // Now print the board
      console.log(title);
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'bombBoard',
    get: function get() {
      return this._bombBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(rows, columns) {
      return Board.generateBoard(rows, columns, ' ');
    }
  }, {
    key: 'generateBoard',
    value: function generateBoard(rows, columns, filler) {
      if (rows <= 0 || columns <= 0) {
        console.log("Error generating board");
        return undefined;
      }
      var board = [];
      for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < columns; j++) {
          row.push(filler);
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'copy',
    value: function copy(board) {
      // map returns a copy, so we can use it to create a new array of rows
      return board.map(function (row) {
        return row.map(function (col) {
          return col;
        });
      });
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(rows, columns, numBombs) {
      if (numBombs > rows * columns) {
        console.log('Too many bombs to place.');
        return undefined;
      }

      // Build array of indices for all possible locations
      var possibleLocations = [];
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          possibleLocations.push([i, j]);
        }
      }

      // Randomly pull numBombs of locations into a second array
      var randBombs = [];
      var bombCount = 0;
      while (bombCount < numBombs) {
        randBombs.push(possibleLocations.splice(Math.floor(Math.random() * possibleLocations.length), 1)[0]);
        bombCount++;
      }

      // Place bombs on each of those random locations
      var board = Board.generateBoard(rows, columns, ' ');
      randBombs.forEach(function (location) {
        board[location[0]][location[1]] = 'B';
      });

      return board;
    }
  }]);

  return Board;
}();

module.exports = Board;