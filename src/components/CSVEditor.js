import React from 'react'
import CSVLoader from './CSVLoader'
import CSVTable from './table'
import csvjson from 'csvjson'
import PropTypes from 'prop-types'
import { getChildWithType } from '../helpers/children'
import EditorContext from './context'
import { validateData, getInvalidData } from './validation'

class CSVEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      csv: '',
      json: [],
      headers: []
    }
    this.fileLoadedHandler = this.fileLoadedHandler.bind(this)
    this.valueChangedHandler = this.valueChangedHandler.bind(this)
  }

  componentDidMount() {
    this.props.csv && this.fileLoadedHandler(this.props.csv)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.csv !== this.props.csv) {
      this.fileLoadedHandler(this.props.csv)
    }
  }

  fileLoadedHandler(csv) {
    let json = csvjson.toObject(csv)
    let headers = json[0] ? Object.keys(json[0]) : []
    json = json.map((data)=>validateData(data, this.props.validate))
    this.setState({
      csv: csv,
      headers: headers,
      json: json
    })
    this.checkNotifyInvalidData(json)
  }

  valueChangedHandler(header, row, value) {
    this.setState((prevState)=>{
      
      let newJson = prevState.json.map((data, index) => {
        if(index === row) return validateData(Object.assign({}, data, { [header] : value}), this.props.validate)
        return data
      })
      this.checkNotifyInvalidData(newJson)

      return {
        json: newJson,
        csv: csvjson.toCSV(newJson)
      }
    })
  }

  checkNotifyInvalidData(json) {
    const { onInvalidInput, onValidInput } = this.props 
    const { data, headers, index } = getInvalidData(json)

    if(data) {
      onInvalidInput && onInvalidInput(data, headers[0], index)
    } else {
      onValidInput && onValidInput()
    }
  }

  setupLoader(children) {
    let loader = getChildWithType(children, CSVLoader, true)
    return React.cloneElement(loader, {
      onFileLoaded: this.fileLoadedHandler
    })
  }

  render() {

    const { children, validate, onInvalidInput } = this.props 
    const { json, headers } = this.state
    
    let loader = this.setupLoader(children)

    return (
      <div>
        {loader}
        <EditorContext.Provider value={{ onValueChanged: this.valueChangedHandler, validate, onInvalidInput }}>
          <CSVTable jsonData={json} headers={headers}/>
        </EditorContext.Provider>
      </div>
    )
  }

}

CSVEditor.propTypes = {
  validate: PropTypes.func,
  onInvalidInput: PropTypes.func,
  onValidInput: PropTypes.func,
  onCsvChanged: PropTypes.func
}

export default CSVEditor