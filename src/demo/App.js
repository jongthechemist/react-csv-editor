import React, { Component } from 'react';
import CSVEditor, { CSVLoader } from '../index.deploy';
import TEST_CSV from './MOCK_DATA_2.csv';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { csv: null };
    this.invalidInputHandler = this.invalidInputHandler.bind(this)
    this.validInputHandler = this.validInputHandler.bind(this)
  }

  componentDidMount() {
    fetch(TEST_CSV)
    .then(response=>response.text())
    .then(csv=>this.setState({csv}))
  }

  validate(data, header, row) {
    // console.log(data, header, row);
    if(data[header] === "Female") return false;

    return true;
  }

  invalidInputHandler(data, header, row) {
    this.setState({
      error: `Invalid input for column ${header} row ${row+1}`
    })
  }

  validInputHandler() {
    this.setState({
      error: `CSV is valid`
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.error && <div>{this.state.error}</div>
        }
        <CSVEditor csv={this.state.csv} validate={this.validate} onInvalidInput={this.invalidInputHandler} onValidInput={this.validInputHandler}>
          <CSVLoader/>
        </CSVEditor>
      </div>
    );
  }
}

export default App;
