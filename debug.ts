import { format, addDays, startOfDay } from "date-fns";

const scheduleTasks = async (taskRepeatsOn: string[], createdOn: string) => {
  try {
    const today = startOfDay(new Date()); // Start from the beginning of today (midnight)

    const currentDayOfWeek = format(today, "EEEE"); // Get the current day of the week (e.g., "Wednesday")

    // If today is Sunday, allow scheduling for the entire next week
    const isSunday = true;
    const daysToSchedule = isSunday ? 7 : 7 - today.getDay();

    for (let i = 0; i < daysToSchedule; i++) {
      const currentDate = addDays(today, i); // Add `i` days to today
      const currentDay = format(currentDate, "EEEE"); // Get the day of the week for the current date

      if (taskRepeatsOn.includes(currentDay)) {
        const scheduledOn = format(currentDate, "yyyy-MM-dd"); // Format the date in YYYY-MM-DD format
        console.log(
          `Scheduled task for ${scheduledOn} and day ${currentDay} and createdOn ${createdOn}`
        );
      }
    }
  } catch (error) {
    console.log("error in scheduleTasks", error);
  }
};

scheduleTasks(["Wednesday", "Monday", "Thursday"], "2025-03-19 02:23:38");
