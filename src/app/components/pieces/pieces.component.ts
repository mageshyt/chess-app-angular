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
  isGrabbing: any;
  constructor(public chess: ChessService) {}
  piece_src = '';
  ngOnInit(): void {
    if (!this.piece) {
      return;
    }
    this.piece_src = this.chess.getPieceImage(this.piece);
  }

  grabPiece(e: any) {
    console.log('grab piece', e.target);
    // set active piece
    this.isGrabbing = true;
    const piece = document.getElementById(this.pieceId);
    if (!piece) {
      return;
    }

    const x = e.clientX - 50;
    const y = e.clientY - 50;

    piece.style.position = 'absolute';
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';

    this.chess.setActivePiece(piece);
  }

  movePiece(e: any) {
    const active_piece = this.chess.getActivePiece();
    const chess_board = this.chess.chessboardRef;

    if (active_piece && chess_board && this.isGrabbing === true) {
      const minX = chess_board.offsetLeft;
      const minY = chess_board.offsetTop;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      active_piece.style.left = x < minX ? minX + 'px' : x + 'px';

      active_piece.style.top = y < minY ? minY + 'px' : y + 'px';
    }
  }

  dropPiece(e: any) {
    const piece = document.getElementById(e.target);
    console.log('drop piece', e.target);
    if (piece) {
      piece.style.position = 'static';
    }

    this.chess.setActivePiece(null);

    this.isGrabbing = false;
  }
}
