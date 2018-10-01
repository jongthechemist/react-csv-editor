import React from 'react'
import _ from 'lodash'
import TData from './tdata'
import PropTypes from 'prop-types'

const TRow = ({headers, rowNumber, data}) => {
  return (
    <tr>
      <td>{rowNumber}</td>
      {
        headers.map(header=><TData rowNumber={rowNumber} key={header} header={header} data={data} value={_.get(data, header)}/>)
      }
    </tr>
  )
}

class TRowContainer extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data
  }

  render() {
    return (<TRow {...this.props}/>)
  }

}

TRowContainer.propTypes = {
  data: PropTypes.object,
  headers: PropTypes.arrayOf(PropTypes.string),
  rowNumber: PropTypes.number
}

export default TRowContainer