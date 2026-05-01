export function isOpenNow(openHours: string, timeZone = "Asia/Dhaka"): boolean {
  const normalized = openHours.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  if (normalized === "24/7" || normalized === "24x7") {
    return true;
  }

  const match = openHours.match(
    /(\d{1,2}:\d{2}\s?[AaPp][Mm])\s*-\s*(\d{1,2}:\d{2}\s?[AaPp][Mm])/,
  );

  if (!match) {
    return false;
  }

  const startMinutes = parseMeridiemTimeToMinutes(match[1]);
  const endMinutes = parseMeridiemTimeToMinutes(match[2]);
  const nowMinutes = currentMinutesInTimeZone(timeZone);

  if (startMinutes === null || endMinutes === null || nowMinutes === null) {
    return false;
  }

  if (endMinutes < startMinutes) {
    return nowMinutes >= startMinutes || nowMinutes <= endMinutes;
  }

  return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
}

function parseMeridiemTimeToMinutes(value: string): number | null {
  const m = value.trim().match(/^(\d{1,2}):(\d{2})\s?([AaPp][Mm])$/);
  if (!m) {
    return null;
  }

  let hour = Number(m[1]);
  const minute = Number(m[2]);
  const meridiem = m[3].toUpperCase();

  if (Number.isNaN(hour) || Number.isNaN(minute) || minute < 0 || minute > 59) {
    return null;
  }

  if (hour < 1 || hour > 12) {
    return null;
  }

  if (meridiem === "AM") {
    if (hour === 12) hour = 0;
  } else if (hour !== 12) {
    hour += 12;
  }

  return hour * 60 + minute;
}

function currentMinutesInTimeZone(timeZone: string): number | null {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  const [hourRaw, minuteRaw] = formatted.split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  return hour * 60 + minute;
}
