import React from 'react'

class TInput extends React.Component {

  changeHandler(event) {
    this.ref.value = event.target.value
  }

  blurHandler(event) {
    const { onChange, value } = this.props
    if(this.ref.value !== value && onChange) {
      onChange(event.target.value)
    }
  }

  componentDidMount() {
    const { value } = this.props
    this.ref.value = value
    this.ref && this.ref.focus()
  }
  
  render() {
    return (
      <input type="text" ref={ref=>this.ref = ref} onChange={this.changeHandler.bind(this)} onBlur={this.blurHandler.bind(this)}/>
    )
  }

}

export default TInput