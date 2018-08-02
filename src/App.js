import React, { Component } from 'react';
import './app.css';
import ChatContainer from './containers/ChatContainer.js';
import ChessContainer from './containers/ChessContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <ChatContainer /> */}
        <ChessContainer />
        <ChatContainer />
      </div>
    );
  }
}

export default App;
