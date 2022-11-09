import { useContext, useEffect, useState } from "react";
import { getTodaysDate, getTomorrowsDate } from "../../../../lib/dateUtils";
import { getPrayerTimes } from "../../../../lib/storageUtils";
import { SettingsContext } from "../../../../lib/contexts";
import { requestApiPrayerTimes } from "../../../../lib/prayersUtils";

const PrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  const dateToday = getTodaysDate();
  const dateTomorrow = getTomorrowsDate();
  const localData = getPrayerTimes();

  const settings = useContext(SettingsContext);

  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    if (localData && dateToday === getTodaysDate(localData.date)) {
      setPrayerTimes(localData);
    } else {
      const apiData = requestApiPrayerTimes();
    }
  }, [dateToday, localData]);

  /*

  -x get date
  -x get tomorrow's date
  -x check local data
  -x if data === localdata date then set local data as state
    -x else get city name + country name
    -x test getting data using city else use country
    - organize prayer times fajr to fajr of tomorrow
      - generate timestamp each prayer
    - save data to local storage and state
  - get next prayer from organized data
    - filter past prayers : timestamp less than date.now, return [0]
  - add timestamp to rcountdown

  */
  return <div></div>;
};

export default PrayerButton;
