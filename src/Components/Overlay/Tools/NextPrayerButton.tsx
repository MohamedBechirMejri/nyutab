import Button from "../../Misc/Button";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../../lib/contexts";
import { getPrayerTimes, savePrayerTimes } from "../../../lib/storageUtils";
import getApiPrayerTimes from "../../../lib/getApiPrayerTimes";
import getNextPrayer from "../../../lib/getNextPrayer";
import RCountdown from "react-countdown";

const NextPrayerButton = ({ setOverlay }: { setOverlay: any }) => {
  const settings = useContext(SettingsContext)!;

  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [nextPrayer, setNextPrayer] = useState<any>(null);

  useEffect(() => {
    const savedPrayerTimes = getPrayerTimes();
    const date = new Date().toString().slice(0, 15);

    if (!settings) return;

    if (
      savedPrayerTimes &&
      date === new Date(savedPrayerTimes.data.date).toString().slice(0, 15)
    ) {
      setPrayerTimes(savedPrayerTimes);
    } else {
      getApiPrayerTimes(settings.city).then(newPrayerTimes => {
        setPrayerTimes(newPrayerTimes);
        savePrayerTimes(newPrayerTimes);
      });
    }
  }, [settings]);

  useEffect(() => {
    if (!prayerTimes) return;
    setNextPrayer(getNextPrayer(prayerTimes)[0]);
  }, [prayerTimes]);

  return (
    <RCountdown
      date={
        new Date(new Date().toString().slice(0, 15) + " " + nextPrayer?.time)
      }
      onComplete={() => {
        setNextPrayer(getNextPrayer(prayerTimes)[0]);
      }}
      renderer={props => {
        const { hours, minutes, seconds } = props.formatted;
        return (
          <Button
            name={`${nextPrayer?.name} in ${`${hours}:${minutes}:${seconds}`}`}
            className="text-teal-400 hover:bg-[#14b8a527]"
            handleClick={() => setOverlay("Islam")}
          />
        );
      }}
    />
  );
};

export default NextPrayerButton;
