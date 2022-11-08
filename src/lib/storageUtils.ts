import type Settings from "../Types/Settings";

export const saveSettings = (settings: Settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const getSettings = () => {
  return localStorage.getItem("settings");
};

export const savePrayerTimes = (data: any) => {
  localStorage.setItem("prayerTimes", JSON.stringify(data));
};

export const getPrayerTimes = () => {
  const prayerTimes = localStorage.getItem("prayerTimes");
  return prayerTimes ? JSON.parse(prayerTimes) : null;
};
