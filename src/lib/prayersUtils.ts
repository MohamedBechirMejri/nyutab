import axios from "axios";
import { getLocation } from "./locationUtils";

export const requestApiPrayerTimes = async () => {
  const { city, country }: { city: string; country: string } =
    await getLocation();

  let prayerTimes = await axios.get(
    `https://dailyprayer.abdulrcs.repl.co/api/${city}`
  );
  return prayerTimes.data.Error
    ? (await axios.get(`https://dailyprayer.abdulrcs.repl.co/api/${country}`))
        .data
    : prayerTimes.data;
};
