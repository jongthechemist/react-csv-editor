import React from 'react';
import CSVLoader from './CSVLoader';
import CSVTable from './table';
import csvjson from 'csvjson';
import { getChildWithType } from '../helpers/children';
import EditorContext from './context';

class CSVEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      csv: '',
      json: [],
      headers: []
    }
    this.fileLoadedHandler = this.fileLoadedHandler.bind(this);
    this.valueChangedHandler = this.valueChangedHandler.bind(this);
  }

  valueChangedHandler(header, rowNumber, value) {
    console.log(header, rowNumber, value);
    const { json } = this.state;
    let newJson = json.map((data, index) => {
      if(index === rowNumber - 1) return Object.assign({}, data, { [header] : value});
      return data;
    })
    this.setState({
      json: newJson,
      //csv: csvjson.toCSV(newJson)
    })
  }

  fileLoadedHandler(csv) {
    let json = csvjson.toObject(csv);
    let headers = json[0] ? Object.keys(json[0]) : [];
    this.setState({
      csv: csv,
      json: json,
      headers: headers
    })
  }

  setupLoader(children) {
    let loader = getChildWithType(children, CSVLoader, true);
    return React.cloneElement(loader, {
      onFileLoaded: this.fileLoadedHandler
    })
  }

  render() {

    const { children } = this.props; 
    const { json, headers } = this.state;
    
    let loader = this.setupLoader(children);

    return (
      <div>
        {loader}
        <EditorContext.Provider value={{ onValueChanged: this.valueChangedHandler }}>
          <CSVTable jsonData={json} headers={headers}/>
        </EditorContext.Provider>
      </div>
    )

  }

}

export default CSVEditor;