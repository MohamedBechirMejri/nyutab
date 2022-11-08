import Button from "../../Misc/Button";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../../lib/contexts";
import { getPrayerTimes, savePrayerTimes } from "../../../lib/storageUtils";
import getApiPrayerTimes from "../../../lib/getApiPrayerTimes";

const NextPrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  const settings = useContext(SettingsContext)!;

  const [prayerTimes, setPrayerTimes] = useState<any>(null);

  useEffect(() => {
    const savedPrayerTimes = getPrayerTimes();
    const date = new Date();

    if (!settings) return;

    if (savedPrayerTimes && date === new Date(savedPrayerTimes.date)) {
      setPrayerTimes(savedPrayerTimes);
    } else {
      getApiPrayerTimes(settings.city).then(newPrayerTimes => {
        setPrayerTimes(newPrayerTimes);
        savePrayerTimes(newPrayerTimes);
      });
    }
  }, [settings]);

  return (
    <Button
      name="Fajr in 00:40:00"
      className="text-teal-400 hover:bg-[#14b8a527]"
      handleClick={() => setOverlay("Islam")}
    />
  );
};

export default NextPrayerButton;
