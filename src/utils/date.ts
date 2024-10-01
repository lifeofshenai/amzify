export const addDaysToDate = (days: number, stmp = Date.now()) => {
  const date = new Date(stmp);
  date.setDate(date.getDate() + days);
  return date;
};
export const addSecondsToDate = (seconds: number, stmp = Date.now()) => {
  const date = new Date(stmp);
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};
export const addMinutesToDate = (minutes: number, stmp = Date.now()) => {
  const date = new Date(stmp);
  date.setMinutes(date.getSeconds() + minutes);
  return date;
};
export const addHoursToDate = (hours: number, stmp = Date.now()) => {
  const date = new Date(stmp);
  date.setHours(date.getSeconds() + hours);
  return date;
};

const getDate = (stmp = Date.now()) => {
  const date = new Date(stmp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const getResetDate = (stmp = Date.now()) => {
  const date = new Date(stmp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const getDiffirenceBetweenDates = (d1: Date, d2: Date) =>
  (d2.getTime() - d1.getTime()) / 1000;

export const formate01 = (date = new Date()) =>
  `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export const getNumberOfDaysInSeconds = (seconds: number) =>
  seconds / (60 * 60 * 24);

export function formatDate(date: Date) {
  date = new Date(date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName} ${day} ${monthName} ${year}`;
}
