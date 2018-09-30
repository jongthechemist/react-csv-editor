import React from 'react';
import THead from './thead';
import TRow from './trow';

class CSVTable extends React.Component {

  render() {
    const { jsonData, headers } = this.props;
    return (
      <div>
        <table>
          <THead headers={headers}/>
          <tbody>
            {
              jsonData.map((data, index)=><TRow key={index} data={data} headers={headers} rowNumber={index+1}/>)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default CSVTable;