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
  isGrabbing: boolean = false;
  activePiece: any;

  pieceSrc = '';

  constructor(public chess: ChessService) {}

  ngOnInit(): void {
    if (!this.piece) {
      return;
    }
    this.pieceSrc = this.chess.getPieceImage(this.piece);

    this.chess.getActivePiece().subscribe((piece) => {
      this.activePiece = piece;
    });
  }

  grabPiece(e: MouseEvent) {
    this.isGrabbing = true;
    const piece = document.getElementById(this.pieceId);
    if (!piece) {
      return;
    }

    this.chess.setActivePiece(piece);
    const chessboardRef = this.chess.chessboardRef;

    if (chessboardRef) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;

      piece.style.position = 'absolute';
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
    }
  }

  movePiece(e: MouseEvent) {
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
    this.activePiece.style.position = 'absolute';

    //If x is smaller than minimum amount
    if (x < minX) {
      this.activePiece.style.left = `${minX}px`;
    }
    //If x is bigger than maximum amount
    else if (x > maxX) {
      this.activePiece.style.left = `${maxX}px`;
    }
    //If x is in the constraints
    else {
      this.activePiece.style.left = `${x}px`;
    }

    //If y is smaller than minimum amount
    if (y < minY) {
      this.activePiece.style.top = `${minY}px`;
    }
    //If y is bigger than maximum amount
    else if (y > maxY) {
      this.activePiece.style.top = `${maxY}px`;
    }
    //If y is in the constraints
    else {
      this.activePiece.style.top = `${y}px`;
    }
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

    this.activePiece.style.position = 'unset';
    this.activePiece.style.left = 'unset';
    this.activePiece.style.top = 'unset';

    this.isGrabbing = false;
    this.chess.setActivePiece(null);
  }
}
