import React from 'react';
import Chessboard from 'react-chessboardjs';

const GameSavedEntry = (props) => {

  const handleClick = function() {
    props.loadGame(props.id);
  }

  return(
    <div className='game-saved-entry' onClick={handleClick}>
      <label>{props.id}</label>
      <Chessboard
        fen={props.fen}
        isDraggable={false}
        width={200}
        showCoordinates={false}
      />
    </div>
  );
}

export default GameSavedEntry;
