import React from 'react';
import Chessboard from 'react-chessboardjs';

const NewGameEntry = (props) => {

  const handleClick = function() {
    props.newGame();
  }

  return(
    <div className='menu-entry'>
      <label className='new-game'>New Game</label>
      <div className='clickable' onClick={handleClick} >
        <Chessboard
          fen='empty'
          isDraggable={false}
          width={'100%'}
          showCoordinates={false}
        />
      </div>
    </div>
  );
}

export default NewGameEntry;
