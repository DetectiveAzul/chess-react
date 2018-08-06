import React from 'react';
import Chessboard from 'react-chessboardjs';

const DeleteGameEntry = (props) => {

  const handleClick = function() {
    const gameToDelete = prompt("Enter ID Game to delete");
    if (gameToDelete) props.deleteGame(gameToDelete);
  }

  return(
    <div className='game-saved-entry' onClick={handleClick}>
      <label>Delete Game</label>
      <Chessboard
        fen='8/8/8/4k3/3K4/8/8/8 w - -'
        isDraggable={false}
        width={200}
        showCoordinates={false}
      />
    </div>
  );
}

export default DeleteGameEntry;
