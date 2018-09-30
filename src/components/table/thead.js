import React from 'react';

const THead = ({headers})=> {
  return (
    <thead>
      <tr>
        <th></th>
        {
          headers.map(header=><th key={header}>{header}</th>)
        }
      </tr>
    </thead>
  )
}

export default THead;