"use client";

import { useEffect, useState } from "react";

/** The time where I am, so a visitor knows whether to expect a quick reply. */
export default function LocalTime({ timeZone = "America/New_York" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()).toLowerCase());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  if (!time) return null;
  return (
    <span>
      {" "}
      · <time>{time}</time> local
    </span>
  );
}
