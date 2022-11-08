import axios from "axios";

const getApiPrayerTimes = async (city: string) => {
  return axios.get(`https://dailyprayer.abdulrcs.repl.co/api/${city}`);
};

export default getApiPrayerTimes;
