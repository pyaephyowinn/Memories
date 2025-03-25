import { getHours, setHours, startOfDay } from "date-fns";

export function updateHours(date: Date, hours: number) {
  return setHours(date, hours);
}

export function updateDateOnly(date?: Date) {
  if (!date) return null;
  const hours = getHours(date);
  return setHours(startOfDay(date), hours);
}
