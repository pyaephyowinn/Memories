import { getHours, setHours, startOfDay, format } from "date-fns";

const dateFormat = "dd MMM yyyy";
const dateTimeFormat = "dd MMM yyyy, HH:mm a";

export function updateHour(date: Date, hours: number) {
  return setHours(date, hours);
}

export function updateDateOnly(date?: Date) {
  if (!date) return null;
  const hours = getHours(date);
  return setHours(startOfDay(date), hours);
}

export function formatDate(date: Date) {
  return format(date, dateFormat);
}

export function formatDateTime(date: Date) {
  return format(date, dateTimeFormat);
}
