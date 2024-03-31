import { fetchPrayerTimes } from "lib/prayersUtils";
import { getLocalData, setLocalData } from "lib/storageUtils";
import { useEffect, useState } from "react";

export default function NextPrayer() {
  const [prayerTime, setPrayerTime] = useState(null);

  useEffect(() => {
    const handlePrayerTimes = async () => {
      const today = new Date().toISOString().split("T")[0];
      const localData = await getLocalData("prayerTimes");

      if (localData?.today.today === today) {
        setPrayerTime(localData.data);
      } else {
        const prayers = await fetchPrayerTimes();
        console.log(prayers);
        setLocalData("prayerTimes", { ...prayers });
        setPrayerTime(prayers);
      }
    };

    handlePrayerTimes();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full p-2">
      Fajr in 00:55
    </div>
  );
}
