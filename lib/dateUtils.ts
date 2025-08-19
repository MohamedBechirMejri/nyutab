export const getDate = () => {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
export const getTime = () => {
  return new Date().toLocaleTimeString()
}

export const getTodaysDate = (date?: any) => {
  return date ? new Date(date) : new Date()
}
export const getTomorrowsDate = () => {
  const today = new Date()
  // to return the date number(1-31) for the specified date
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  //returns the tomorrow date
  return tomorrow
}

export const generateTimestamp = (date: string | number | Date, time: any) => {
  return new Date(`${date.toString().slice(0, 15)} ${time}`).getTime()
}

export const parseSeconds = (seconds: number) => {
  const handleSingleDigits = (n: number) => {
    return n.toString().length === 1 ? `0${n}` : n
  }

  const s = handleSingleDigits(seconds % 60) // seconds
  const m = handleSingleDigits(~~((seconds / 60) % 60)) // minutes
  const h = handleSingleDigits(~~(seconds / 3600)) // hours

  return `${h}:${m}:${s}`
}

export const getToday = () => {
  return new Date().toISOString().split('T')[0]
}
