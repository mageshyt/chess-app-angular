import { Injectable } from '@angular/core';
import { PiecesType } from '../lib/data';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class RefreeService {
  private notyf: Notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'right',
      y: 'top',
    },
  });
  constructor() {}

  isValidMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number,
    type: PiecesType,
    color: string
  ): boolean {
    switch (type) {
      case PiecesType.Pawn:
        return this.isValidPawnMove(newRow, newCol, row, col, color);
      case PiecesType.Rook:
        return this.isValidRookMove(newRow, newCol, row, col);
      case PiecesType.Knight:
        return this.isValidKnightMove(newRow, newCol, row, col);
      case PiecesType.Bishop:
        return this.isValidBishopMove(newRow, newCol, row, col, color);
      case PiecesType.Queen:
        return this.isValidQueenMove(newRow, newCol, row, col);
      case PiecesType.King:
        return this.isValidKingMove(newRow, newCol, row, col);
      default:
        return false;
    }
  }
  isValidRookMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number
  ): boolean {
    this.notyf.error('Rook move not implemented');
    return false;
  }
  isValidKnightMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number
  ): boolean {
    console.log('isValidKnightMove', newRow, newCol, row, col);
    const rowDiff = Math.abs(newRow - row);
    const colDiff = Math.abs(newCol - col);

    // Check if the knight is moving in an L shape
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      return true;
    }

    return false;
  }

  isValidBishopMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number,
    color: string
  ): boolean {
    this.notyf.error('Bishop move not implemented');

    return false;
  }
  isValidQueenMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number
  ): boolean {
    this.notyf.error('Queen move not implemented');
    return false;
  }
  isValidKingMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number
  ): boolean {
    this.notyf.error('Knig move not implemented');
    return false;
  }
  isValidPawnMove(
    newRow: number,
    newCol: number,
    row: number,
    col: number,
    color: string
  ): boolean {
    // Determine the direction of movement based on the pawn's color
    const rowOffset = color === 'w' ? -1 : 1;

    // Check if the pawn is moving forward by one row
    if (newRow === row + rowOffset && newCol === col) {
      return true;
    }

    // Check if the pawn is moving forward by two rows from its starting position
    if (
      newRow === row + rowOffset * 2 &&
      newCol === col &&
      ((row === 6 && color === 'w') || (row === 1 && color === 'b'))
    ) {
      return true;
    }

    // Check if the pawn is capturing a piece diagonally
    if (
      newRow === row + rowOffset &&
      (newCol === col - 1 || newCol === col + 1)
    ) {
      return true;
    }

    // If none of the above conditions are met, the move is not valid
    return false;
  }
}
