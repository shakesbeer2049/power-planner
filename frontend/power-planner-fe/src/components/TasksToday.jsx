import { useEffect, useState } from "react";
import { getToday } from "../utils/weekdays";

const TasksToday = ({ taskList }) => {
  const [tasksToday, setTasksToday] = useState({
    health: [],
    wealth: [],
    knowledge: [],
  });

  const makeTaskList = () => {
    const today = getToday();
    console.log("today", today);
    const tasksToday = taskList.filter((task) =>
      task?.repeatsOn?.includes(today)
    );
    console.log("tasksToday", tasksToday);
    const healthTasks = tasksToday.map(
      (task) => task?.taskCategory == "health"
    );
    const wealthTasks = tasksToday.map(
      (task) => task?.taskCategory == "wealth"
    );
    const knowledgeTasks = tasksToday.map(
      (task) => task?.taskCategory == "knowledge"
    );

    setTasksToday({
      health: healthTasks,
      wealth: wealthTasks,
      knowledge: knowledgeTasks,
    });
  };

  useEffect(() => {
    console.log("taskList in useEffect", taskList);
    if (taskList.length > 0) makeTaskList();
  }, [taskList]);

  return (
    <>
      <h1>FOCUS ON TODAY</h1>

      <h2>Health</h2>
      {tasksToday.health.map((task) => (
        <h4>{task.taskName}</h4>
      ))}
      <h2>Knowledge</h2>
      {tasksToday.wealth.map((task) => (
        <h4>{task.taskName}</h4>
      ))}

      <h2>Wealth</h2>
      {tasksToday.knowledge.map((task) => (
        <h4>{task.taskName}</h4>
      ))}
    </>
  );
};

export default TasksToday;
