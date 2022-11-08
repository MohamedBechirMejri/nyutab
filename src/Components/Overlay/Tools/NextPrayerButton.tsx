import Button from "../../Misc/Button";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../../lib/contexts";
import { getPrayerTimes, savePrayerTimes } from "../../../lib/storageUtils";
import getApiPrayerTimes from "../../../lib/getApiPrayerTimes";

const NextPrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  const settings = useContext(SettingsContext)!;

  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState({
    name: "I guess it's the end of the world",
    timeLeft: "00:00:00",
  });

  useEffect(() => {
    const savedPrayerTimes = getPrayerTimes();
    const date = new Date().toString().slice(0, 15);

    if (!settings) return;

    if (
      savedPrayerTimes &&
      date === new Date(savedPrayerTimes.data.date).toString().slice(0, 15)
    ) {
      setPrayerTimes(savedPrayerTimes);
      console.log(date);
    } else {
      getApiPrayerTimes(settings.city).then(newPrayerTimes => {
        setPrayerTimes(newPrayerTimes);
        savePrayerTimes(newPrayerTimes);
      });
    }
  }, [settings]);

  useEffect(() => {
    if (!prayerTimes) return;

    const prayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha'a"];

    console.log(prayerTimes.data.today);
  }, [prayerTimes]);

  return (
    <Button
      name={`${nextPrayer.name} in ${nextPrayer.timeLeft}`}
      className="text-teal-400 hover:bg-[#14b8a527]"
      handleClick={() => setOverlay("Islam")}
    />
  );
};

export default NextPrayerButton;
