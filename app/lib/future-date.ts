/** Calendar dates are interpreted in India Standard Time, not server or browser time zones. */
export function todayInIndia(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function earliestFutureDateInIndia(now = new Date()): string {
  const today = todayInIndia(now);
  const next = new Date(`${today}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
}

/** Enforces genuine YYYY-MM-DD dates strictly after today in Asia/Kolkata. */
export function isFutureDateInIndia(value: string, now = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value && value > todayInIndia(now);
}

export const FUTURE_DATE_ERROR = "Please select a future date. Today and past dates are not allowed.";
