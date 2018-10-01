import React from 'react'
import TInput from './tinput'
import EditorContext from '../context'
import { isValid } from '../validation'

const TDataFocused = (props) => (
  <TInput {...props}/>
)

const TDDataBlurred = ({valid, value}) => (
  <div className={valid ? "valid" : "invalid"}>
    {value}
  </div>
)

class TDataContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.blurHandler = this.blurHandler.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data || this.state.focused !== nextState.focused
  }

  clickHandler(event) {
    this.setState({
      focused: true
    })
  }

  blurHandler(event) {
    this.setState({
      focused: false
    })
  }

  render() {
    const {value, rowNumber, header, data} = this.props
    const {focused} = this.state

    let valid = isValid(data, header)
    
    return (
      <td onClick={this.clickHandler} onBlur={this.blurHandler}>
        {
          focused ?
          <EditorContext.Consumer>
            {
              ({onValueChanged})=><TDataFocused valid={valid} value={value} onChange={(value)=>onValueChanged(header, rowNumber - 1, value)}/>
            }
          </EditorContext.Consumer> :
          <TDDataBlurred valid={valid} value={value}/>
        }
      </td>
    )
  }

}

export default TDataContainer