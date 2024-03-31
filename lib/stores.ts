import { create } from "zustand";
import Settings from "../types/Settings";

type SettingsStore = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const useSettingsStore = create<SettingsStore>(set => ({
  settings: null,
  setSettings: settings => set({ settings }),
}));

type OverlayStore = {
  overlay: string;
  setOverlay: (overlay: string) => void;
};

export const useOverlayStore = create<OverlayStore>(set => ({
  overlay: "",
  setOverlay: overlay => set({ overlay }),
}));
