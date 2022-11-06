import type Settings from "../Types/Settings";

export const saveSettings = (settings: Settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const getSettings = () => {
  return localStorage.getItem("settings");
};
