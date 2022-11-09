import axios from "axios";
import { getLocation } from "./locationUtils";

export const requestApiPrayerTimes = async () => {
  const { city, country }: { city: string; country: string } =
    await getLocation();

  let prayerTimes = await axios.get(
    `https://dailyprayer.abdulrcs.repl.co/api/${city}`
  );
  console.log("prayerTimes: ", prayerTimes);
  return (
    prayerTimes ||
    (await axios.get(`https://dailyprayer.abdulrcs.repl.co/api/${country}`))
  );
};
