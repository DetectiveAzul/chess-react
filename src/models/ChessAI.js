class ChessAI {
  constructor() {
    this.pawnEvalWhite = [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];
    this.knightEval = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];
    this.bishopEvalWhite = [
      [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
      [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
      [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
      [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
      [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
      [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
      [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ];
    this.rookEvalWhite = [
      [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
      [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
      [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
    ];
    this.evalQueen = [
      [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
      [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
      [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
      [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
      [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
      [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
      [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ];
    this.kingEvalWhite = [
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
      [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
      [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
      [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
      [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
    ];

    this.reverseArray = function(array) {
      return array.slice().reverse();
    };

    //Black pieces are mirrored from white pieces
    this.pawnEvalBlack = this.reverseArray(this.pawnEvalWhite);
    this.bishopEvalBlack = this.reverseArray(this.bishopEvalWhite);
    this.rookEvalBlack = this.reverseArray(this.rookEvalWhite);
    this.kingEvalBlack = this.reverseArray(this.kingEvalWhite);

  };

  minimaxRoot(depth, game, isMaximisingPlayer) {
    const newGameMoves = game.moves();
    let bestMove = -9999;
    let bestMoveFound;

    for (var i = 0; i < newGameMoves.length; i++) {
      let newGameMove = newGameMoves[i];
      game.move(newGameMove);
      let value = this.minimax(depth -1, game, -10000, 10000, !isMaximisingPlayer);
      game.undo();
      if(value >= bestMove) {
        bestMove = value;
        bestMoveFound = newGameMove;
      };
    };
    return bestMoveFound;
  };

  minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) {
      return -this.evaluateBoard(game.board());
    };

    const newGameMoves = game.moves();

    if (isMaximisingPlayer) {
        let bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            };
        };
        return bestMove;
    } else {
        let bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            };
        };
        return bestMove;
    };
  };

  //Evaluate the total value of all the pieces
  evaluateBoard(board) {
      let totalEvaluation = 0;
      for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
              totalEvaluation = totalEvaluation + this.getPieceValue(board[i][j], i ,j);
          }
      }
      return totalEvaluation;
  };

  //Get the total value for a piece depending on its place
  getPieceValue(piece, x, y) {
    if (piece === null) {
        return 0;
    }
    const absoluteValue = this.getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
  };

  getAbsoluteValue(piece, isWhite, x ,y) {
      if (piece.type === 'p') {
          return 10 + ( isWhite ? this.pawnEvalWhite[y][x] : this.pawnEvalBlack[y][x] );
      } else if (piece.type === 'r') {
          return 50 + ( isWhite ? this.rookEvalWhite[y][x] : this.rookEvalBlack[y][x] );
      } else if (piece.type === 'n') {
          return 30 + this.knightEval[y][x];
      } else if (piece.type === 'b') {
          return 30 + ( isWhite ? this.bishopEvalWhite[y][x] : this.bishopEvalBlack[y][x] );
      } else if (piece.type === 'q') {
          return 90 + this.evalQueen[y][x];
      } else if (piece.type === 'k') {
          return 900 + ( isWhite ? this.kingEvalWhite[y][x] : this.kingEvalBlack[y][x] );
      };
  };

};

export default ChessAI;
