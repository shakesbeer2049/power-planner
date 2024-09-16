import { getToday, isDateInCurrentWeek } from "./daysAndDates";

export const calculateDailyProgress = (taskData) => {
  const tasksToday = taskData.filter((task) =>
    task.taskRepeatsOn.includes(getToday())
  );
  const dailyTaskCount = tasksToday.length;
  const completedTasks = tasksToday.filter((task) => task.isCompleted).length;
  return parseInt((completedTasks / dailyTaskCount) * 100);
};

export const generateStats = (tasks, selectedStat) => {
  let totalTasks = 0;
  let completedTasks = 0;

  if (selectedStat === "overall") {
    totalTasks = tasks.length || 0;
    completedTasks = tasks.filter((task) => task.isCompleted).length;
  }else if (selectedStat === "weekly") {
    const today = getToday();
    totalTasks = tasks.filter((task) =>
      isDateInCurrentWeek(task.createdOn)
    ).length;

    completedTasks = tasks.filter(
      (task) => isDateInCurrentWeek(task.createdOn) && task.isCompleted
    ).length;
  } else if (selectedStat === "yearly") {
    const thisYear = new Date().getFullYear().toString();

    totalTasks = tasks.filter((task) =>
      task?.createdOn?.includes(thisYear)
    ).length;
    completedTasks = tasks.filter(
      (task) => task?.createdOn?.includes(thisYear) && task.isCompleted
    ).length;
  }

  const achievedPercent = ((completedTasks / totalTasks) * 100).toFixed(1);
  return { totalTasks, completedTasks, achievedPercent };
};
