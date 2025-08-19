const convertTimestamp = (timestamp: number) => {
  let // Convert the passed timestamp to milliseconds
    d = new Date(timestamp * 1000)
  let yyyy = d.getFullYear()
  // Months are zero based. Add leading 0.
  let mm = ('0' + (d.getMonth() + 1)).slice(-2)
  // Add leading 0.
  let dd = ('0' + d.getDate()).slice(-2)
  let hh = d.getHours()
  let h = hh
  // Add leading 0.
  let min = ('0' + d.getMinutes()).slice(-2)
  let ampm = 'AM'
  let time

  if (hh > 12) {
    h = hh - 12
    ampm = 'PM'
  } else if (hh === 12) {
    h = 12
    ampm = 'PM'
  } else if (hh === 0) {
    h = 12
  }

  // ie: 2013-02-18, 8:35 AM
  time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm

  return time
}

export default convertTimestamp
