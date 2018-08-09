import React from 'react';
import Chessboard from 'react-chessboardjs';

const DeleteGameEntry = (props) => {

  const handleClick = function() {
    const gameToDelete = prompt("Enter ID Game to delete");
    if (gameToDelete) props.deleteGame(gameToDelete);
  }

  return(
    <div className='menu-entry'>
      <label className='delete-game'>Delete Game</label>
      <div className='clickable' onClick={handleClick}>
        <Chessboard
          fen='8/8/8/4k3/3K4/8/8/8 w - -'
          isDraggable={false}
          width={'100%'}
          showCoordinates={false}
        />
      </div>
    </div>
  );
}

export default DeleteGameEntry;
