import { useEffect, useState } from "react";

export function useDateDisplay() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/London", // Specify the timezone as UK time
      };
      const formattedDate = now.toLocaleDateString("en-GB", options);
      setCurrentDate(formattedDate);
    };

    getCurrentDate();

    // Update date every minute (optional)
    const interval = setInterval(getCurrentDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return currentDate;
}
