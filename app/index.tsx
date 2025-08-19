import { AnimatePresence } from 'framer-motion'
import { getDefaults } from 'lib/defaultsSettings'
import { getUserLocation } from 'lib/locationUtils'
import { getLocalData, setLocalData } from 'lib/storageUtils'
import { useOverlayStore, useSettingsStore } from 'lib/stores'
import { useEffect } from 'react'
import type Settings from 'types/settings'
import Home from './home'
import Overlay from './overlay'

function App() {
  const { overlay } = useOverlayStore()
  const { settings, setSettings } = useSettingsStore()

  useEffect(() => {
    const localSettings = getLocalData('settings') as Settings

    let settings = null as Settings | null

    if (localSettings) settings = localSettings
    else {
      const defaultSettings = getDefaults()
      settings = defaultSettings
    }

    setSettings(settings)
    setLocalData('settings', settings)

    getUserLocation().then(({ latitude, longitude }) => {
      if (!settings) return console.log('No settings')

      const newSettings = {
        ...settings,
      }

      newSettings.position!.latitude = latitude
      newSettings.position!.longitude = longitude

      setSettings(newSettings)
      setLocalData('settings', newSettings)
    })
  }, [])

  return (
    <div className="relative h-screen max-h-screen overflow-hidden home overscroll-none">
      <AnimatePresence>{overlay && <Overlay />}</AnimatePresence>
      {settings && <Home />}
    </div>
  )
}

export default App
