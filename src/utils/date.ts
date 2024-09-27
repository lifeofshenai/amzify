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
