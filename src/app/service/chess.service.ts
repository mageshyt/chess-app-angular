import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  private activePiece!: any;

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
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) {
    const piece = this.chessboard[startRow][startCol];
    this.chessboard[endRow][endCol] = piece;
    this.chessboard[startRow][startCol] = ' ';
  }

  setActivePiece(piece: any) {
    this.activePiece = piece;
  }

  getActivePiece() {
    return this.activePiece;
  }

  // set chessboard ref

  setChessboardRef(ref: any) {
    this.chessboardRef = ref;
  }
}
