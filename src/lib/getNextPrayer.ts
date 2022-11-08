const getNextPrayer = (prayerTimes: any) => {
  const times = prayerTimes.data.today;
  const prayers = [
    { name: "Fajr", time: 0 + times["Fajr"] },
    { name: "Sunrise", time: times["Sunrise"] },
    { name: "Dhuhr", time: times["Dhuhr"] },
    { name: "Asr", time: times["Asr"] },
    { name: "Maghrib", time: times["Maghrib"] },
    { name: "Isha'a", time: times["Isha'a"] },
  ];
  const d = new Date();
  const currentTime = d.getHours() + ":" + d.getMinutes();

  return prayers.filter(prayer => prayer.time > currentTime);
};

export default getNextPrayer;
