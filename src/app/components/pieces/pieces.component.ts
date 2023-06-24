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
    const chessboardRef = this.chess.chessboardRef;

    if (this.activePiece && chessboardRef && this.isGrabbing) {
      const minX = chessboardRef.offsetLeft - 25;
      const minY = chessboardRef.offsetTop - 25;

      const maxX = chessboardRef.offsetLeft + chessboardRef.offsetWidth - 75;
      const maxY = chessboardRef.offsetTop + chessboardRef.offsetHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      this.activePiece.style.position = 'absolute';
      if (x < minX || x > maxX || y < minY || y > maxY) {
        return;
      }

      this.activePiece.style.left = `${x}px`;
      this.activePiece.style.top = `${y}px`;
    }
  }

  dropPiece(e: any) {
    console.log(e);
    if (!this.activePiece) {
      return;
    }
    const chessboardRef = this.chess.chessboardRef;
    const piece = this.activePiece.id.split('-');

    console.log(this.activePiece);
    // console.log(pieceId);
    const row = Math.floor(
      (this.activePiece.offsetTop - chessboardRef.offsetTop) / 100
    );
    const col = Math.floor(
      (this.activePiece.offsetLeft - chessboardRef.offsetLeft) / 100
    );

    console.log(row, col);

    this.chess.movePiece(row, col, this.piece, +piece[1], +piece[2]);

    this.activePiece.style.position = 'unset';
    this.activePiece.style.left = 'unset';
    this.activePiece.style.top = 'unset';

    this.isGrabbing = false;
    this.chess.setActivePiece(null);
  }
}
