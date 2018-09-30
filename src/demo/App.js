import React, { Component } from 'react';
import CSVEditor, { CSVLoader } from '../index.deploy';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CSVEditor>
          <CSVLoader/>
        </CSVEditor>
      </div>
    );
  }
}

export default App;
