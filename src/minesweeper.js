// create and initialize board
const board = [];
for(i = 0; i < 3; i++) {
  board.push([]);
  for (j=0; j<3; j++) {
    board[i].push(' ');
  }
}

const printBoard = (board) => {
  console.log("Current board:");
  for (const row of board) {
    console.log(row.join(' | '));
  }
};

printBoard(board);

board[0][1] = 1;
board[2][2] = 'B';
printBoard(board);
