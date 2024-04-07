import axios from "axios";
import { PrayerTimes } from "types/prayers";
import { generateTimestamp } from "./dateUtils";

export const requestApiPrayerTimes = async (city: string, country: string) => {
  let prayerTimes = await axios.get(
    `https://api.aladhan.com/v1/timingsByCity/20-05-2023?city=${city}&country=${country}`
  );

  return prayerTimes.data.Error
    ? (await axios.get(`https://dailyprayer.abdulrcs.repl.co/api/`)).data
    : prayerTimes.data;
};

export const getNextPrayer = (prayerTimes: {
  today: PrayerTimes;
  tomorrow: PrayerTimes;
}) => {
  const { today, tomorrow } = prayerTimes;
  const prayers = [
    {
      name: "Fajr",
      time: today["fajr"],
      timestamp: generateTimestamp(today.parsedDate, 0 + today["fajr"]),
    },
    {
      name: "Sunrise",
      time: today["sunrise"],
      timestamp: generateTimestamp(today.parsedDate, today["sunrise"]),
    },
    {
      name: "Dhuhr",
      time: today["dhuhr"],
      timestamp: generateTimestamp(today.parsedDate, today["dhuhr"]),
    },
    {
      name: "Asr",
      time: today["asr"],
      timestamp: generateTimestamp(today.parsedDate, today["asr"]),
    },
    {
      name: "Maghrib",
      time: today["maghrib"],
      timestamp: generateTimestamp(today.parsedDate, today["maghrib"]),
    },
    {
      name: "Isha'a",
      time: today["isha"],
      timestamp: generateTimestamp(today.parsedDate, today["isha"]),
    },
    {
      name: "Fajr",
      time: tomorrow["fajr"],
      timestamp: generateTimestamp(tomorrow.parsedDate, 0 + tomorrow["fajr"]),
    },
  ];
  return prayers.filter(prayer => prayer.timestamp > Date.now())[0];
};

export const fetchPrayerTimes = async () => {
  const response = await fetch("https://nyutab-api.vercel.app/api/v1/prayers");
  const data = await response.json();
  return data;
};
