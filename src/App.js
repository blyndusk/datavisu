import React, { Component } from 'react';
import './scss/master.scss';

import Timeline from './Components/Timeline/Timeline';

class App extends Component {
  render() {
    return (
      <div className="App">
        app
        <Timeline/>
      </div>
    );
  }
}

export default App;
