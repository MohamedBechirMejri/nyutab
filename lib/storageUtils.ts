import type Settings from '../types/settings'

export const saveSettings = (settings: Settings) => {
  localStorage.setItem('settings', JSON.stringify(settings))
}

export const getSettings = () => {
  return localStorage.getItem('settings')
}

export const savePrayerTimes = (data: any) => {
  localStorage.setItem('prayerTimes', JSON.stringify(data))
}

export const getPrayerTimes = () => {
  const prayerTimes = localStorage.getItem('prayerTimes')
  return prayerTimes ? JSON.parse(prayerTimes) : null
}

export const saveMemes = (data: any) => {
  localStorage.setItem('memes', JSON.stringify(data))
}

export const getLocalMemes = () => {
  const memes = localStorage.getItem('memes')
  return memes ? JSON.parse(memes) : null
}

export const setLocalData = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data))
}

export const getLocalData = (name: string) => {
  const data = localStorage.getItem(name)

  return data ? JSON.parse(data) : null
}
