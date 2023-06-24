import { Component, Input, OnInit } from '@angular/core';
import { ChessService } from 'src/app/service/chess.service';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss'],
})
export class PiecesComponent implements OnInit {
  @Input() piece!: string;
  @Input() pieceId: string = '';

  isDragging: boolean = false;
  activePiece: any;
  @Input() pieceSrc!: string;

  constructor(public chess: ChessService) {}

  ngOnInit(): void {
    if (!this.piece) {
      return;
    }

    this.chess.getActivePiece().subscribe((piece) => {
      this.activePiece = piece;
    });
  }

  grabPiece(e: MouseEvent) {
    console.log('grap');
    if (this.isDragging) {
      // Perform drop logic
      this.dropPiece(e);
    } else {
      // Perform grab logic
      this.isDragging = true;
      const piece = document.getElementById(this.pieceId);
      if (!piece) {
        return;
      }

      this.chess.setActivePiece(piece);
      const chessboardRef = this.chess.chessboardRef;

      // Set possible moves
      const pieceIdParts = this.pieceId.split('-');
      const row = Number(pieceIdParts[1]);
      const col = Number(pieceIdParts[2]);
      // TODO: Fix this
      this.chess.setPossibleMoves(row, col, this.piece);

      if (chessboardRef) {
        const x = e.clientX - 50;
        const y = e.clientY - 50;

        piece.style.position = 'absolute';
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;
      }
    }
  }

  movePiece(e: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    const chessboard = this.chess.chessboardRef;

    const minX = chessboard.offsetLeft - 25;
    const minY = chessboard.offsetTop - 25;
    const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
    const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
    const x = e.clientX - 50;
    const y = e.clientY - 50;

    if (!this.activePiece) {
      return;
    }
    if (x < minX || x > maxX || y < minY || y > maxY) {
      return;
    }
    this.activePiece.style.position = 'absolute';
    this.activePiece.style.left = `${x}px`;
    this.activePiece.style.top = `${y}px`;
  }

  dropPiece(e: MouseEvent) {
    const chessboardRef = this.chess.chessboardRef;
    if (!chessboardRef || !this.activePiece) {
      return;
    }

    const chessboardWidth = chessboardRef.offsetWidth;
    const chessboardHeight = chessboardRef.offsetHeight;

    const gridSize = Math.min(chessboardWidth, chessboardHeight) / 8;
    const row = Math.floor((e.clientY - chessboardRef.offsetTop) / gridSize);
    const col = Math.floor((e.clientX - chessboardRef.offsetLeft) / gridSize);

    const piece = this.activePiece.id.split('-');
    const pieceType = piece[0];
    const oldX = Number(piece[1]);
    const oldY = Number(piece[2]);

    this.chess.movePiece(row, col, this.piece, oldX, oldY, pieceType);
    console.log('dropping');
    this.activePiece.style.position = 'unset';
    this.activePiece.style.left = 'unset';
    this.activePiece.style.top = 'unset';

    this.isDragging = false;
    this.chess.setActivePiece(null);

    this.chess.clearPossibleMoves();
  }
}
