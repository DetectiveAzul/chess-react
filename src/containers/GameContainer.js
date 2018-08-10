import React from 'react';
import ChatContainer from '../components/ChatContainer.js';
import ChessContainer from '../components/ChessContainer.js';
import './styles/GameContainer.css';

const GameContainer = (props) => {

    return (
      <div className="Game">
        <ChessContainer
          id={props.id}
          fen={props.fen}
          history={props.history}
          ai={props.ai}
          finished={props.finished}
        />
        <ChatContainer id={props.id} />
      </div>
    );

}

export default GameContainer;
