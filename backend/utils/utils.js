exports.getDayOfWeek = function () {
  const date = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay(date); // Get the day of the week as a number (0-6)
  return daysOfWeek[dayIndex]; // Return the corresponding day name
};
