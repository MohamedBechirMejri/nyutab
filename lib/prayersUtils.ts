import axios from "axios";
import { getLocation } from "./locationUtils";
import { generateTimestamp } from "./dateUtils";

export const requestApiPrayerTimes = async (city: string, country: string) => {
  let prayerTimes = await axios.get(
    `https://api.aladhan.com/v1/timingsByCity/20-05-2023?city=${city}&country=${country}`
  );
  console.log(prayerTimes);

  return prayerTimes.data.Error
    ? (await axios.get(`https://dailyprayer.abdulrcs.repl.co/api/`)).data
    : prayerTimes.data;
};

export const getNextPrayer = (
  prayerTimes: any,
  dateToday: Date,
  dateTomorrow: Date
) => {
  const { today, tomorrow } = prayerTimes;
  const prayers = [
    {
      name: "Fajr",
      time: today["Fajr"],
      timestamp: generateTimestamp(dateToday, 0 + today["Fajr"]),
    },
    {
      name: "Sunrise",
      time: today["Sunrise"],
      timestamp: generateTimestamp(dateToday, today["Sunrise"]),
    },
    {
      name: "Dhuhr",
      time: today["Dhuhr"],
      timestamp: generateTimestamp(dateToday, today["Dhuhr"]),
    },
    {
      name: "Asr",
      time: today["Asr"],
      timestamp: generateTimestamp(dateToday, today["Asr"]),
    },
    {
      name: "Maghrib",
      time: today["Maghrib"],
      timestamp: generateTimestamp(dateToday, today["Maghrib"]),
    },
    {
      name: "Isha'a",
      time: today["Isha'a"],
      timestamp: generateTimestamp(dateToday, today["Isha'a"]),
    },
    {
      name: "Fajr",
      time: tomorrow["Fajr"],
      timestamp: generateTimestamp(dateTomorrow, 0 + tomorrow["Fajr"]),
    },
  ];
  return prayers.filter(prayer => prayer.timestamp > Date.now())[0];
};
