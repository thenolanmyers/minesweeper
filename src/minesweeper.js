const generatePlayerBoard = (rows, columns) => {
  return generateBoard (rows, columns, ' ');
}

function generateBoard (rows, columns, filler) {
  if (rows <= 0 || columns <= 0) {
    console.log ("Error generating board");
    return undefined;
  }
  let board = [];
  for (i = 0; i < rows; i++) {
    let row = [];
    for (j=0; j < columns; j++ ) {
      row.push(filler);
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (rows, columns, numBombs) => {
  let board = generateBoard(rows, columns, null);

  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
      let randRow = Math.floor(Math.random() * rows);
      let randCol = Math.floor(Math.random() * columns);

      board[randRow][randCol] = 'B';
      bombsPlaced++;
      // TODO: refactor to handle case where one bomb is placed on top of another
  }
  return board;
}

/*
const printBoard = (board) => {
  console.log("Current board:");
  for (const row of board) {
    console.log(row.join(' | '));
  }
};
*/

const printBoard = (header, board) => {
  console.log(header);
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

printBoard('Player board:', generatePlayerBoard(3,4));
printBoard('Bomb board:', generateBombBoard(3,4,5));

/*
// create and initialize board
const board = [];
for(i = 0; i < 3; i++) {
  board.push([]);
  for (j=0; j<3; j++) {
    board[i].push(' ');
  }
}
*/


/*
printBoard(board);

board[0][1] = 1;
board[2][2] = 'B';
printBoard(board);
*/
