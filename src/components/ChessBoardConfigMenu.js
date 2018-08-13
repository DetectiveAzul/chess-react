import React from 'react';
import config from '../config/config.js';

const ChessBoardConfigMenu = (props) => {
  const handleChange = (event) => {
    props.setAiDifficulty(event.target.value);
  };

  const goBack = () => {
    window.open(config.client, "_self");
  };

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
      <select defaultValue={`${props.aiDifficulty}`} onChange={handleChange}>
        <option value='1'>Easy</option>
        <option value='2'>Medium</option>
        <option value='3'>Hard</option>
      </select>
      <button
        className='config-input'
        onClick={props.swapOrientation}
        >Swap Orientation
      </button>
      <button
        className='config-input'
        onClick={goBack}
        >Back to Loby
      </button>
    </div>
  );
};

export default ChessBoardConfigMenu;
