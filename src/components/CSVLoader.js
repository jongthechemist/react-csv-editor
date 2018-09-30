import React from 'react';

class CSVLoader extends React.Component {

  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  fileChangedHandler(event) {

    const { onFileLoaded } = this.props;

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      onFileLoaded(reader.result);
    };
    reader.readAsText(input.files[0]);

  }

  render() {

    return (
      <input type="file" onChange={this.fileChangedHandler} accept=".csv"/>
    )
  }
}

export default CSVLoader;