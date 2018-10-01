import React from 'react'
import THead from './thead'
import TRow from './trow'
import PropTypes  from 'prop-types'

const CSVTable = ({jsonData, headers}) => (
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

CSVTable.propTypes = {
  jsonData: PropTypes.arrayOf(PropTypes.object)
}

export default CSVTable;