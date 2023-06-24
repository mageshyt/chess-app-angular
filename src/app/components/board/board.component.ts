import { Component, OnInit } from '@angular/core';
import { ChessService } from 'src/app/service/chess.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(public chess: ChessService) {}

  // isWhiteSquare

  isWhiteSquare(row: number, col: number): boolean {
    const isRowEven = row % 2 === 0;
    const isColEven = col % 2 === 0;
    // an even row and an odd column is a white square
    return (isRowEven && !isColEven) || (!isRowEven && isColEven);
  }

  isBlackSquare(row: number, col: number): boolean {
    return !this.isWhiteSquare(row, col);
  }

  ngOnInit(): void {
    this.setChessboardRef();
  }

  private setChessboardRef() {
    // Get the chessboard element
    const element = document.querySelector('.board');
    if (element) {
      // Set the chessboard element
      this.chess.setChessboardRef(element);
    }
  }
}
