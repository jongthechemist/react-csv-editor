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
    this.setState((prevState)=>{
      let newJson = prevState.json.map((data, index) => {
        if(index === rowNumber - 1) return Object.assign({}, data, { [header] : value});
        return data;
      });
      return {
        json: newJson,
        csv: csvjson.toCSV(newJson)
      }
    })
  }

  fileLoadedHandler(csv) {
    let json = csvjson.toObject(csv);
    let headers = json[0] ? Object.keys(json[0]) : [];
    this.setState({
      csv: csv,
      headers: headers
    })
    this.incrementalLoad(json);
  }

  incrementalLoad(json) {
    setTimeout(() => {
      let hasMore = this.state.json.length + 1 < json.length;
      this.setState((prev) => ({
        json: [...prev.json, ...json.slice(prev.json.length, prev.json.length+10)] 
      }));
      if (hasMore) this.incrementalLoad(json);
    }, 0);
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