'use strict';

var blankLine = '  |   |  ';

// Show blank board
console.log('This is what an empty board would look like:');
console.log(blankLine + '\n' + blankLine + '\n' + blankLine);

// Show guess board
var guessLine = '1 |   |  ';
var bombLine = '  | B |  ';

console.log('This is what a board with a guess and a bomb on it would look like:');
console.log(guessLine + '\n' + bombLine + '\n' + blankLine);