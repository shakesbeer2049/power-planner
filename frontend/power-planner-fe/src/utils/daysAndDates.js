export const isDateInCurrentWeek = (date) => {
  const now = new Date();

  // Get the start of the week (Sunday)
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0); // Set the start time to 00:00:00

  // Get the end of the week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // Set the end time to 23:59:59

  // Convert the passed date to Date object if it's not already
  const givenDate = new Date(date);

  // Compare the given date with the week range
  return givenDate >= startOfWeek && givenDate <= endOfWeek;
};

export const getDaysLeft = () => {
  const weekDays = [
    { value: "Monday", label: "Mon" },
    { value: "Tuesday", label: "Tue" },
    { value: "Wednesday", label: "Wed" },
    { value: "Thursday", label: "Thu" },
    { value: "Friday", label: "Fri" },
    { value: "Saturday", label: "Sat" },
    { value: "Sunday", label: "Sun" },
  ];

  return weekDays.slice(new Date().getDay() - 1);
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

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getYears = () => {
  const startYear = 2023;
  const endYear = 2026;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  return years;
};

export const getWeekOfMonth = (date) => {
  // Clone the date to avoid modifying the original
  const clonedDate = new Date(date);

  // Get the first day of the month for the given date
  const firstDayOfMonth = new Date(
    clonedDate.getFullYear(),
    clonedDate.getMonth(),
    1
  );

  // Calculate the day of the week the first day of the month falls on
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Calculate the adjusted day of the month (considering the first week)
  const dayOfMonth = clonedDate.getDate();
  const adjustedDayOfMonth = dayOfMonth + firstDayOfWeek;

  // Calculate the week number (1-based index)
  const weekOfMonth = Math.ceil(adjustedDayOfMonth / 7);

  return weekOfMonth;
};
