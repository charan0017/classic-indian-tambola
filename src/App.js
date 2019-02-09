import React, { Component } from 'react';

import './App.css';
import TambolaGameManager from './containers/TambolaGameManager/TambolaGameManager';

class App extends Component {
  render() {
    return (
        <div className='App'>
          <TambolaGameManager maxNumbers={90} />
        </div>
    );
  }
}

export default App;
