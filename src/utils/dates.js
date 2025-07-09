export const getStartOfWeek = (date) => {
  const startOfWeek = new Date(date);
  const dayOfWeek = startOfWeek.getUTCDay(); // Get the day of the week (0-6)
  const difference =
    startOfWeek.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust if Sunday
  startOfWeek.setUTCDate(difference);
  startOfWeek.setUTCHours(0, 0, 0, 0); // Set time to 00:00:00.000 UTC
  return startOfWeek;
};

export const getEndOfWeek = (date) => {
  const endOfWeek = new Date(getStartOfWeek(date));
  endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 6);
  endOfWeek.setUTCHours(23, 59, 59, 999); // Set time to 23:59:59.999 UTC
  return endOfWeek;
};

export const getToday = () => {
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = dayOfWeek[new Date().getDay()];
  return today;
};
