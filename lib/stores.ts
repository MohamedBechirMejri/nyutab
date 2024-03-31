import { create } from "zustand";
import Settings from "../types/settings";
import { Overlay } from "types/overlay";

type SettingsStore = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const useSettingsStore = create<SettingsStore>(set => ({
  settings: null,
  setSettings: settings => set({ settings }),
}));

type OverlayStore = {
  overlay: Overlay;
  setOverlay: (overlay: Overlay) => void;
};

export const useOverlayStore = create<OverlayStore>(set => ({
  overlay: null,
  setOverlay: overlay => set({ overlay }),
}));
