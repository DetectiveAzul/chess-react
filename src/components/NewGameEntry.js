import React from 'react';
import Chessboard from 'react-chessboardjs';

const NewGameEntry = (props) => {

  const handleClick = function() {
    props.newGame();
  }

  return(
    <div className='game-saved-entry' onClick={handleClick}>
      <label>New Game</label>
      <Chessboard
        fen='empty'
        isDraggable={false}
        width={200}
        showCoordinates={false}
      />
    </div>
  );
}

export default NewGameEntry;
