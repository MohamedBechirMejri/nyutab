import type { Overlay } from 'types/overlay'
import { create } from 'zustand'
import type Settings from '../types/settings'
import { getDefaults } from './defaultsSettings'

type SettingsStore = {
  settings: Settings
  setSettings: (settings: Settings) => void
}

export const useSettingsStore = create<SettingsStore>(set => ({
  settings: getDefaults(),
  setSettings: settings => set({ settings }),
}))

type OverlayStore = {
  overlay: Overlay | null
  subOverlay: string | null
  setOverlay: (overlay: Overlay | null, subOverlay?: string) => void
}

export const useOverlayStore = create<OverlayStore>(set => ({
  overlay: null,
  subOverlay: null,
  setOverlay: (overlay, subOverlay) =>
    set({
      overlay: overlay,
      subOverlay: overlay && subOverlay ? subOverlay : null,
    }),
}))
