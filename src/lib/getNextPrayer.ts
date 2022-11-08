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
  const nextPrayers = prayers.filter(prayer => prayer.time > currentTime);
  return nextPrayers.length > 0
    ? nextPrayers
    : [{ name: "Fajr", time: 0 + prayerTimes.data.tomorrow["Fajr"] }];
};

export default getNextPrayer;
