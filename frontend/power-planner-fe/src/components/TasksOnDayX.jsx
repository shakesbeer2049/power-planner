import { useEffect, useState } from "react";
import { getToday } from "../utils/daysAndDates";
import "../styles/tasksToday.css";
import { TbMoodEmpty } from "react-icons/tb";
const TasksToday = ({ taskList, weekDay }) => {
  const [tasksToday, setTasksToday] = useState({
    health: [],
    wealth: [],
    knowledge: [],
  });

  const makeTaskList = () => {
    const tasksToday = taskList.filter((task) =>
      task?.taskRepeatsOn?.includes(weekDay)
    );
    const healthTasks = tasksToday.filter(
      (task) => task?.taskCategory == "health"
    );
    const wealthTasks = tasksToday.filter(
      (task) => task?.taskCategory == "wealth"
    );
    const knowledgeTasks = tasksToday.filter(
      (task) => task?.taskCategory == "knowledge"
    );

    setTasksToday({
      health: healthTasks,
      wealth: wealthTasks,
      knowledge: knowledgeTasks,
    });
  };

  useEffect(() => {
    if (taskList?.length > 0) makeTaskList();
  }, [taskList]);

  return (
    <div className="tasks-today text-left mt-16 ml-8">
      <h1 className="text-3xl font-bold text-center">{weekDay}</h1>

      <h2 className="text-2xl font-bold mb-4 mt-4">Health</h2>
      <div className="tasks">
        {tasksToday.health?.length > 0 ? (
          tasksToday.health.map((task) => (
            <div className="task-h1-input">
              {" "}
              <input
                type="checkbox"
                className="checkbox checkbox-accent"
                name="task"
                id="task"
                checked={task.isCompleted}
              />{" "}
              <h4 className={task.isCompleted ? "completed" : ""}>
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-center">
            {" "}
            So Empty! <TbMoodEmpty />{" "}
          </span>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-4">Knowledge</h2>
      <div className="tasks">
        {tasksToday.wealth?.length > 0 ? (
          tasksToday.wealth.map((task) => (
            <div className="task-h1-input">
              {" "}
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="task"
                id="task"
                checked={task.isCompleted}
              />{" "}
              <h4 className={task.isCompleted ? "completed" : ""}>
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-center">
            {" "}
            So Empty! <TbMoodEmpty />{" "}
          </span>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4 mt-4">Wealth</h2>
      <div className="tasks">
        {tasksToday.knowledge?.length > 0 ? (
          tasksToday.knowledge.map((task) => (
            <div className="task-h1-input">
              {" "}
              <input
                type="checkbox"
                checked={task.isCompleted}
                name="task"
                id="task"
                className="checkbox checkbox-accent"
              />{" "}
              <h4 className={task.isCompleted ? "completed" : ""}>
                {task.taskName}
              </h4>
            </div>
          ))
        ) : (
          <span className="text-center">
            {" "}
            So Empty! <TbMoodEmpty />{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default TasksToday;
