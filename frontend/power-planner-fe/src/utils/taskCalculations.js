import { getToday } from "./weekdays";


export const calculateDailyProgress = (taskData) => {
    const tasksToday = taskData.filter((task) =>
      task.taskRepeatsOn.includes(getToday())
    );
    const dailyTaskCount = tasksToday.length;
    const completedTasks = tasksToday.filter((task) => task.isCompleted).length;
    return parseInt((completedTasks /  dailyTaskCount) * 100);
    
  };