import { useContext, useEffect, useState } from "react";
import { getTodaysDate, getTomorrowsDate } from "../../../../lib/dateUtils";
import { getPrayerTimes, savePrayerTimes } from "../../../../lib/storageUtils";
import { SettingsContext } from "../../../../lib/contexts";
import RCountdown from "react-countdown";
import Button from "../../../Misc/Button";
import {
  requestApiPrayerTimes,
  getNextPrayer,
} from "../../../../lib/prayersUtils";

const PrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  const dateToday = getTodaysDate();
  const dateTomorrow = getTomorrowsDate();

  const settings = useContext(SettingsContext);

  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const localData = await getPrayerTimes();

      if (
        localData &&
        dateToday.toString().slice(0, 15) ===
          getTodaysDate(localData.date).toString().slice(0, 15)
      ) {
        setPrayerTimes(localData);
      } else {
        if (!settings) return;
        const { city, country } = settings.position;
        const apiData = await requestApiPrayerTimes(city, country);

        setPrayerTimes(apiData);
        savePrayerTimes(apiData);
      }
    })();
  }, [settings]);

  useEffect(() => {
    if (!prayerTimes) return;

    const nextPrayer = getNextPrayer(prayerTimes, dateToday, dateTomorrow);
    setNextPrayer(nextPrayer);
  }, [prayerTimes]);

  return nextPrayer ? (
    <RCountdown
      date={nextPrayer.timestamp}
      onComplete={() => {
        setNextPrayer(getNextPrayer(prayerTimes, dateToday, dateTomorrow));
      }}
      renderer={(props) => {
        const { hours, minutes, seconds } = props.formatted;
        return (
          <Button
            name={`${nextPrayer.name} in ${`${hours}:${minutes}:${seconds}`}`}
            className="text-teal-400 hover:bg-[#14b8a527]"
            handleClick={() => setOverlay("prayers")}
          />
        );
      }}
    />
  ) : (
    <Button
      name={`loading next prayer`}
      className="text-teal-400 hover:bg-[#14b8a527]"
      handleClick={() => console.log("hi")}
    />
  );
};

export default PrayerButton;
