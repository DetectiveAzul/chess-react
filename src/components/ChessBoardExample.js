<Chessboard
  blackSquareColour="steelblue" // Default: '#b58863'
  dropOffBoard={false} // If a piece is dragged off the board, remove it. Default: false
  fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R" // The 'pieces' part of a fen string
  // (additional info such as side to move will be stripped). ['start' | 'empty'] also valid.
  // Default: 'start'
  isDraggable={true} // Can the pieces be dragged? Default: true
  orientation="b" // ['w', 'b'] Default: 'w'
  pieceTheme="uscf" // ['alpha', 'uscf', 'wikipedia'] Default: 'wikipedia'
  showCoordinates={false} // Default: true
  sparePieces={true} // Spare pieces can be dragged on to the board, for setting
  // up positions. Default: false
  style={{
    border: '2px solid lightgrey',
  }}
  whiteSquareColour="aliceblue" // Default: '#f0d9b5'
  width={400} // String ('100%', of container) | number (px). If expressed as a percentage,
  // the board will resize with its container. Default: 400

  // Events: similar to chessboard.js events. Additional onResize, onSquareClick events.
  onChange={(oldPos, newPos) => console.log('onChange fired', oldPos, newPos)}
  onDragMove={(algebraic, fromSquare, piece, fen, orientation) =>
    console.log('onDragMove fired', algebraic, fromSquare, piece, fen, orientation)}
  onDragStart={(square, piece, fen, orientation) =>
    console.log('onDragStart fired', square, piece, fen, orientation)}
  onDrop={(square, toSquare, piece, newPosition, fen, orientation) =>
    console.log('onDrop fired', square, toSquare, piece, newPosition, fen, orientation)}
  onMouseOutSquare={(algebraic, piece, fen, orientation) =>
    console.log('onMouseOutSquare fired', algebraic, piece, fen, orientation)}
  onMouseOverSquare={(algebraic, piece, fen, orientation) =>
    console.log('onMouseOverSquare fired', algebraic, piece, fen, orientation)}
  onMoveEnd={(oldPos, newPos) => console.log('onMoveEnd fired', oldPos, newPos)}
  onResize={(oldWidth, newWidth) => console.log('onResize fired', oldWidth, newWidth)}
  onSnapbackEnd={(piece, square, fen, orientation) =>
    console.log('onSnapbackEnd fired', piece, square, fen, orientation)}
  onSquareClick={(isRightClick, square, piece, fen, orientation) => console.log(isRightClick, square, piece, fen, orientation)}
/>
