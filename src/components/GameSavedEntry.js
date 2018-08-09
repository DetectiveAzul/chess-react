import React from 'react';
import Chessboard from 'react-chessboardjs';

const GameSavedEntry = (props) => {

  const handleClick = function() {
    props.loadGame(props.id);
  }

  return(
    <div className='game-saved-entry' >
      <label className='entry-id'>{props.id}</label>
      <div className='clickable' onClick={handleClick}>
        <Chessboard
          fen={props.fen}
          isDraggable={false}
          width={'100%'}
          showCoordinates={false}
        />
      </div>
    </div>
  );
}

export default GameSavedEntry;
