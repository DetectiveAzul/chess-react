import React from 'react';

const ChessBoardConfigMenu = (props) => {
  const handleChange = (event) => {
    props.setAiDifficulty(event.target.value);
  }

  return(
    <div className='chess-config-container'>
      <button
        className='config-input'
        onClick={props.undoMovement}
        >Undo Move
      </button>
      <button
        className='config-input'
        onClick={props.setAi}
        >Ai: {props.aiState}
      </button>
      <select defaultValue={props.aiDifficulty} onChange={handleChange}>
        <option value='1'>Easy</option>
        <option value='2'>Medium</option>
        <option value='3'>Hard</option>
      </select>
      <button
        className='config-input'
        onClick={props.swapOrientation}
        >Swap Orientation
      </button>
    </div>
  );
};

export default ChessBoardConfigMenu;
