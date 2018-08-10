class ChessAI {

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

  evaluateBoard(board) {
      let totalEvaluation = 0;
      for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
              totalEvaluation = totalEvaluation + this.getPieceValue(board[i][j], i ,j);
          }
      }
      return totalEvaluation;
  };



  getPieceValue(piece, x, y) {
      if (piece === null) {
          return 0;
      }
      const getAbsoluteValue = function (piece) {
          if (piece.type === 'p') {
              return 10;
          } else if (piece.type === 'r') {
              return 50;
          } else if (piece.type === 'n') {
              return 30;
          } else if (piece.type === 'b') {
              return 30;
          } else if (piece.type === 'q') {
              return 90;
          } else if (piece.type === 'k') {
              return 900;
          }
          throw "Unknown piece type: " + piece.type;
      };

      const absoluteValue = getAbsoluteValue(piece);
      return piece.color === 'w' ? absoluteValue : -absoluteValue;
  };

};

export default ChessAI;
