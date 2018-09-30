import React from 'react';
import TInput from './tinput';
import EditorContext from '../context';

class TData extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
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
    const {value, rowNumber, header} = this.props;
    const {focused} = this.state;
    return (
      <td onClick={this.clickHandler} onBlur={this.blurHandler}>
        {
          this.renderContent(value, focused, rowNumber, header)
        }
      </td>
    )

  }

  renderContent(value, focused, rowNumber, header) {
    if(focused) {
      return (
        <EditorContext.Consumer>
          {
            ({onValueChanged}) => (
              <TInput value={value} onChange={(value)=>onValueChanged(header, rowNumber, value)}/>
            )
          }
        </EditorContext.Consumer>
      )
    } else {
      return value;
    }
  }

}

export default TData;