import { useContext, useEffect, useState } from "react";
import { getTodaysDate, getTomorrowsDate } from "../../../../lib/dateUtils";
import { getPrayerTimes, savePrayerTimes } from "../../../../lib/storageUtils";
import { SettingsContext } from "../../../../lib/contexts";
import {
  requestApiPrayerTimes,
  getNextPrayer,
} from "../../../../lib/prayersUtils";

const PrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  const dateToday = getTodaysDate();
  const dateTomorrow = getTomorrowsDate();
  const localData = getPrayerTimes();

  const settings = useContext(SettingsContext);

  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState<any>(null);

  useEffect(() => {
    if (localData && dateToday === getTodaysDate(localData.date)) {
      setPrayerTimes(localData);
    } else {
      (async () => {
        if (!settings) return;
        const { city, country } = settings.location;
        const apiData = await requestApiPrayerTimes(city, country);

        setPrayerTimes(apiData);
        savePrayerTimes(apiData);
      })();
    }
  }, [settings]);

  useEffect(() => {
    if (!prayerTimes) return;

    const nextPrayer = getNextPrayer(prayerTimes, dateToday, dateTomorrow);
    setNextPrayer(nextPrayer);
  }, [prayerTimes]);

  return <div></div>;
};

export default PrayerButton;
