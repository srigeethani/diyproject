"use client";
import { useEffect, useState } from "react";

const Reminder = ({ reminderTime, projectName }) => {
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (!reminderTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(reminderTime).getTime();

      if (now >= target && !alertShown) {
        alert(`⏰ Reminder: Work on your project "${projectName}"!`);
        setAlertShown(true);
        clearInterval(interval);
      }
    }, 1000); 

    return () => clearInterval(interval);
  }, [reminderTime, alertShown, projectName]);

  return null;
};

export default Reminder;
