import { Component, Input, OnInit } from '@angular/core';
import { ChessService } from 'src/app/service/chess.service';

type pieceType = 'r' | 'n' | 'b' | 'q' | 'k' | 'p' | ' ';
type pieceColor = 'w' | 'b';
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  @Input() piece!: string;
  @Input() pieceId: string = '';
  @Input() color!: pieceColor;

  constructor(public chess: ChessService) {}

  ngOnInit(): void {}
}
