const generatePlayerBoard = (rows, columns) => {
  return generateBoard (rows, columns, ' ');
}

const generateBoard = (rows, columns, filler) => {
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
  let board = generateBoard(rows, columns, ' ');

  if (numBombs > rows * columns) {
    console.log ('Too many bombs to place.');
    return board;
  }

  let bombsPlaced = 0;
  while (bombsPlaced < numBombs) {
      let randRow = Math.floor(Math.random() * rows);
      let randCol = Math.floor(Math.random() * columns);

      // This is SUPER INEFFICIENT if bomb density gets high
      // TODO fix this to pull from a "deck" of random locations
      if (board[randRow][randCol] !== 'B') {
        board[randRow][randCol] = 'B';
        bombsPlaced++;
      }
  }
  return board;
}

const getNumberOfNeighborBombs = (board, row, col) => {
  const neighborOffsets = [];

  // Add a neighbor for each row and column +/- 1 from index
  for (i=-1; i<=1; i++) {
    for (j=-1; j<=1; j++){
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
    if ( i >= 0 && i < board.length && j >= 0 && j < board[0].length ) {
      // console.log(`Checking ${i}, ${j}`);
      if (board[i][j] === 'B') bombCount++;
    }
  });

  /* Print the board in debug mode...
  board[row][col] = 'X';
  printBoard ('Count elements: ', board, true);
  console.log(`Count for ${row}, ${col} = ${bombCount}`);
  */

  return bombCount;
}

const printBoard = (title, board, debugMode) => {
  // If in debugMode add a header row and column to the board before printing
  // Header row will be on top; header column on the right side (easier to read than left side)
  if (debugMode) {
    // Create a header row and prepend it to the board
    const rowHead = [];
    for (i=0; i<board[0].length; i++) {
      rowHead.push(i);
    }
    board.unshift (rowHead);

    // Add a header column to each row on the board
    let rowCounter = -1; // accommodate the header row
    board.forEach( row => {
      row.push (rowCounter++);
    });
  }

  // Now print the board
  console.log(title);
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const flipTile = (playerBoard, bombBoard, row, col) => {
  if (playerBoard[row][col] !== ' ') {
    console.log('Tile has already been flipped!');
  } else if (bombBoard[row][col] === 'B') {
    playerBoard[row][col] = 'B';
  } else {
    playerBoard[row][col] = getNumberOfNeighborBombs(bombBoard, row, col);
  }
  return;
}



/* MAIN BODY OF PROGRAM */

const playerBoard = generatePlayerBoard(6,5);
const bombBoard = generateBombBoard(6,5,12);

printBoard('Player board:', playerBoard);
printBoard('Bomb board:', bombBoard);

flipTile (playerBoard, bombBoard, 0, 0);
flipTile (playerBoard, bombBoard, 1, 4);
flipTile (playerBoard, bombBoard, 2, 3);
printBoard('Player board:', playerBoard);

//console.log(getNumberOfNeighborBombs(bombBoard,3,2));
