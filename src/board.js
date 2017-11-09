class Board {
  constructor (rows, cols, bombs) {
    this._numBombs = bombs;
    this._numTiles = rows * cols;
    this._playerBoard = Board.generatePlayerBoard(rows, cols);
    this._bombBoard = Board.generateBombBoard(rows, cols, bombs);
  }

  get playerBoard () { return this._playerBoard; }
  get bombBoard () { return this._bombBoard; }

  /**
   * Flips specified Tile
   * @param {number} row
   * @param {number} col
   * @returns {Boolean} whether the flip happened
   */
  flipTile (row, col) {
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

  getNumberOfNeighborBombs (row, col) {
    const neighborOffsets = [];

    // console.log(`Counting neighbors: ${row}, ${col}`);
    // this.print('playerBoard');
    // this.print('bombBoard');

    // Create array with all adjacent indices to row, col
    // Add a neighbor for each row and column +/- 1 from index
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++){
        if (i === 0 && j === 0) continue;

        neighborOffsets.push([row + i, col + j]);
      }
    }

    // Count bombs among all offsets
    let bombCount = 0;
    neighborOffsets.forEach( offset => {
      const i = offset[0];
      const j = offset[1];

      // But only if in range of the board
      if ( i >= 0 && i < this._bombBoard.length && j >= 0 && j < this._bombBoard[0].length ) {
        // console.log(`Checking ${i}, ${j}`);
        if (this._bombBoard[i][j] === 'B') bombCount++;
      }
    });

    return bombCount;
  }

  hasSafeTiles () {
    // console.log (this._numTiles !== this._numBombs);
    return this._numTiles !== this._numBombs;
  }

  print (boardName, debugMode) { // optional parameters
    // Default to playerBoard and debugMode off if not specified
    let title = boardName ? boardName + ':' : 'Player board:';
    boardName = boardName ? boardName : 'playerBoard';
    debugMode = debugMode ? debugMode : false;
    let board = [];

    // If in debugMode add a header row and column to a copy of the board before printing
    // Header row will be on top; header column on the right side (easier to read than left side)
    if (debugMode) {
      board = Board.copy(this[boardName]);
      // Create a header row and prepend it to the board
      const rowHead = [];
      for (let i=0; i<board[0].length; i++) {
        rowHead.push(i);
      }
      board.unshift (rowHead);

      // Add a header column to each row on the board
      let rowCounter = -1; // accommodate the header row
      board.forEach( row => {
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
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard (rows, columns) {
    return Board.generateBoard (rows, columns, ' ');
  }

  static generateBoard (rows, columns, filler) {
    if (rows <= 0 || columns <= 0) {
      console.log ("Error generating board");
      return undefined;
    }
    let board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j=0; j < columns; j++ ) {
        row.push(filler);
      }
      board.push(row);
    }
    return board;
  }

  static copy (board) {
    // map returns a copy, so we can use it to create a new array of rows
    return board.map(row => row.map(col => col));
  }

  static generateBombBoard (rows, columns, numBombs) {
    if (numBombs > rows * columns) {
      console.log ('Too many bombs to place.');
      return undefined;
    }

    // Build array of indices for all possible locations
    let possibleLocations = [];
    for (let i=0; i < rows; i++) {
      for (let j=0; j < columns; j++) {
        possibleLocations.push([i,j]);
      }
    }

    // Randomly pull numBombs of locations into a second array
    let randBombs = [];
    let bombCount = 0;
    while (bombCount < numBombs) {
      randBombs.push(
          possibleLocations.splice( Math.floor(Math.random() *
                                    possibleLocations.length),1)[0]);
      bombCount++;
    }

    // Place bombs on each of those random locations
    let board = Board.generateBoard(rows, columns, ' ');
    randBombs.forEach( location => {
      board[location[0]][location[1]] = 'B';
    });

    return board;
  }

}
module.exports = Board;
