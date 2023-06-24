import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChessService {
  // Declare the chessboard as a 2D array of strings
  public chessboard: string[][] = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  // chessboard ref
  public chessboardRef: any;

  // activePiece

  // activePiece as Observable

  private activePieceSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public activePiece$: Observable<any> = this.activePieceSubject.asObservable();

  constructor() {}
  getPieceImage(piece: string): string {
    if (piece === ' ') {
      return '';
    }
    const pieceImageDict: any = {
      // Define the dictionary mapping for piece names to image file names
      r: 'rook_black.png',
      n: 'knight_black.png',
      b: 'bishop_black.png',
      q: 'queen_black.png',
      k: 'king_black.png',
      p: 'pawn_black.png',
      R: 'rook_white.png',
      N: 'knight_white.png',
      B: 'bishop_white.png',
      Q: 'queen_white.png',
      K: 'king_white.png',
      P: 'pawn_white.png',
    };

    // Retrieve the image file name from the dictionary based on the piece name

    const file = `assets/pieces/${pieceImageDict[piece]}`;
    return file;
  }
  // Function to move a piece on the chessboard
  movePiece(
    row: number,
    col: number,
    piece: string,
    oldRow: number,
    oldCol: number
  ) {
    // check if piece is valid
    if (!piece) {
      return;
    }
    console.log(this.chessboard[row][col]);
    if (this.chessboard[row][col] !== ' ') return;

    this.chessboard[row][col] = piece;
    this.chessboard[oldRow][oldCol] = ' ';

    // old row and old col
    console.log(`Moved ${piece} to ${oldRow},${oldCol}`);
    console.log(`Moved ${piece} to ${row},${col}`);

    console.table(this.chessboard);
  }

  setActivePiece(piece: any) {
    this.activePieceSubject.next(piece);
  }

  getActivePiece(): Observable<any> {
    return this.activePiece$;
  }

  // set chessboard ref

  setChessboardRef(ref: any) {
    this.chessboardRef = ref;
  }
}
