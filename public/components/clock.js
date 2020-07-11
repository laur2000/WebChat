import React, { useState, useEffect } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [setDate]);

  return (
    <time>
      {date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()}
    </time>
  );
}
