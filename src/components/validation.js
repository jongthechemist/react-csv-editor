export const validateData = (data, validate) => {
  if(!validate) return data
  return Object.assign({}, data, { csvInvalidHeaders: Object.keys(data).filter((attr)=>!validate(data, attr)), payload: data })
}

export const isValid = (data, header) => {
  if(!header)
    return data.csvInvalidHeaders.length === 0
  else
    return data.csvInvalidHeaders.findIndex(h=>h===header) < 0
}

export const getInvalidData = (dataArray) => {
  let invalids = dataArray.filter((data)=>!isValid(data))
  if(invalids.length > 0) {
    return {
      data: invalids[0],
      headers: invalids[0].csvInvalidHeaders,
      index: dataArray.findIndex(data=>data === invalids[0])
    }
  }
  return {
    data: null,
    headers: [],
    index: -1
  }
}

export const getPayload = (dataArray) => {
  return dataArray.map((data)=>data.payload || data)
}