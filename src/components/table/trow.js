import React from 'react';
import _ from 'lodash';
import TData from './tdata';

class TRow extends React.PureComponent {

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.data !== this.props.data;
  // }

  render() {
    const {data, headers, rowNumber} = this.props;
    return (
      <tr>
        <td>{rowNumber}</td>
        {
          headers.map(header=><TData rowNumber={rowNumber} header={header} key={header} value={_.get(data, header)}/>)
        }
      </tr>
    )
  }

}

export default TRow;