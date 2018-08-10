import React from 'react';

const ChessBoardConfigMenu = (props) => {

  return(
    <div className='chess-config-container'>
      <button
        className='config-input'
        onClick={props.undoMovement}
        >Undo Move</button>
      <button
        className='config-input'
        onClick={props.setAi}
        >Ai: {props.aiState}</button>
      <button
        className='config-input'
        onClick={props.swapOrientation}
        >Swap Orientation</button>
    </div>
  );
};

export default ChessBoardConfigMenu;
