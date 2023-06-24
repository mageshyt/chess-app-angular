import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RefreeService } from './refree.service';
import { board, piece_dict, pieces_images } from '../lib/data';
import { Notyf } from 'notyf';
@Injectable({
  providedIn: 'root',
})
export class ChessService {
  private notyf: Notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'right',
      y: 'top',
    },
  });
  // Declare the chessboard as a 2D array of strings
  public chessboard: string[][] = board;

  // chessboard ref
  public chessboardRef: any;

  private tempBoard!: string[][];

  // activePiece as Observable

  private activePieceSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public activePiece$: Observable<any> = this.activePieceSubject.asObservable();

  constructor(private refree: RefreeService) {}
  getPieceImage(piece: string): string {
    if (piece === ' ') {
      return '';
    }
    const pieceImageDict: any = pieces_images;

    // Retrieve the image file name from the dictionary based on the piece name

    const file = `/assets/pieces/${pieceImageDict[piece]}`;
    return file;
  }
  // Function to move a piece on the chessboard
  public movePiece(
    row: number,
    col: number,
    piece: string,
    oldRow: number,
    oldCol: number,
    turn: string
  ) {
    console.log('movePiece', row, col, piece, oldRow, oldCol, turn);
    // Check if the move is valid
    if (!this.isValidSquare(row, col)) {
      this.notyf.error('Invalid move - Outside the board');
      return;
    }
    const res = this.refree.isValidMove(
      row,
      col,
      oldRow,
      oldCol,
      piece_dict[piece.toLocaleLowerCase()],
      turn
    );

    if (!res) {
      this.notyf.error('Invalid move - Refree');
      return;
    }
    this.chessboard[row][col] = piece;

    // Clear the previous position of the piece
    this.chessboard[oldRow][oldCol] = ' ';
  }

  isValidSquare(row: number, col: number): boolean {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  isOpponentPiece(row: number, col: number): boolean {
    const piece = this.chessboard[row][col];
    return piece !== ' ' && piece.toUpperCase() !== piece;
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

  // get possible moves
  setPossibleMoves(row: number, col: number, piece: string): any[] {
    const possibleMoves: any[] = [];
    switch (piece) {
      case 'P': // White Pawn
        // Check if the pawn can move one square forward
        if (
          this.isValidSquare(row - 1, col) &&
          this.chessboard[row - 1][col] === ' '
        ) {
          possibleMoves.push({ row: row - 1, col });
        }

        // Check if the pawn can move two squares forward from its starting position
        if (
          row === 6 &&
          this.chessboard[row - 1][col] === ' ' &&
          this.chessboard[row - 2][col] === ' '
        ) {
          possibleMoves.push({ row: row - 2, col });
        }

        // Check if the pawn can capture a piece diagonally to the left
        if (
          this.isValidSquare(row - 1, col - 1) &&
          this.chessboard[row - 1][col - 1] !== ' ' &&
          this.isOpponentPiece(row - 1, col - 1)
        ) {
          possibleMoves.push({ row: row - 1, col: col - 1 });
        }

        // Check if the pawn can capture a piece diagonally to the right
        if (
          this.isValidSquare(row - 1, col + 1) &&
          this.chessboard[row - 1][col + 1] !== ' ' &&
          this.isOpponentPiece(row - 1, col + 1)
        ) {
          possibleMoves.push({ row: row - 1, col: col + 1 });
        }

        break;

      case 'p': // Black Pawn
        // Check if the pawn can move one square forward
        if (
          this.isValidSquare(row + 1, col) &&
          this.chessboard[row + 1][col] === ' '
        ) {
          possibleMoves.push({ row: row + 1, col });
        }

        // Check if the pawn can move two squares forward from its starting position
        if (
          row === 1 &&
          this.chessboard[row + 1][col] === ' ' &&
          this.chessboard[row + 2][col] === ' '
        ) {
          possibleMoves.push({ row: row + 2, col });
        }

        // Check if the pawn can capture a piece diagonally to the left
        if (
          this.isValidSquare(row + 1, col - 1) &&
          this.chessboard[row + 1][col - 1] !== ' ' &&
          this.isOpponentPiece(row + 1, col - 1)
        ) {
          possibleMoves.push({ row: row + 1, col: col - 1 });
        }

        // Check if the pawn can capture a piece diagonally to the right
        if (
          this.isValidSquare(row + 1, col + 1) &&
          this.chessboard[row + 1][col + 1] !== ' ' &&
          this.isOpponentPiece(row + 1, col + 1)
        ) {
          possibleMoves.push({ row: row + 1, col: col + 1 });
        }

        break;

      default:
        break;
    }
    // Update the chessboard with possible move markers
    this.updateChessboardWithPossibleMoves(possibleMoves);

    return possibleMoves;
  }

  private updateChessboardWithPossibleMoves(possibleMoves: any[]): void {
    // Update the chessboard with possible move markers
    possibleMoves.forEach((move) => {
      const { row, col } = move;
      if (this.chessboard[row][col] == ' ') {
        this.chessboard[row][col] = 'X';
      } else {
        this.chessboard[row][col] += ' A';
      }
    });
  }

  public clearPossibleMoves() {
    this.chessboard.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 'X') {
          this.chessboard[rowIndex][colIndex] = ' ';
        }
        if (col.includes('A')) {
          this.chessboard[rowIndex][colIndex] = col.split('')[0];
        }
      });
    });
  }
}
