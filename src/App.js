import React, { Component } from 'react';

import classes from './App.css';
import TambolaGameManager from './containers/TambolaGameManager/TambolaGameManager';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <TambolaGameManager maxNumbers={90} />
      </div>
    );
  }
}

export default App;
