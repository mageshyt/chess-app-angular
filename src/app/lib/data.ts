export enum PiecesType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
}
const board: string[][] = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const pieces_images = {
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

const piece_dict: any = {
  r: PiecesType.Rook,
  n: PiecesType.Knight,
  b: PiecesType.Bishop,
  q: PiecesType.Queen,
  k: PiecesType.King,
  p: PiecesType.Pawn,
};

export { board, pieces_images, piece_dict };
