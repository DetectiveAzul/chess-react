import React from 'react';
import Chessboard from 'react-chessboardjs';

const NewGameEntry = (props) => {

  const handleClick = function() {
    props.newGame();
  }

  return(
    <div className='game-saved-entry' onClick={handleClick}>
      <label className='new-game'>New Game</label>
      <Chessboard
        fen='empty'
        isDraggable={false}
        width={'100%'}
        showCoordinates={false}
      />
    </div>
  );
}

export default NewGameEntry;
