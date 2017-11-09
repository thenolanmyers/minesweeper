import {Board} from './board';
import {Game} from './game';


/* MAIN BODY OF PROGRAM */

const myBoard = new Board (6,5,12);
const g = new Game(3,3,2);
g.playMove(0,0);
g.playMove(2,1);

// myBoard.print('playerBoard',true);
// myBoard.print('bombBoard',true);



//console.log(getNumberOfNeighborBombs(bombBoard,3,2));
