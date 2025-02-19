import { useEffect, useState, useContext } from "react";
import { getToday } from "../utils/daysAndDates";
import "../styles/tasksToday.css";
import DeleteTaskModal from "./DeleteTaskModal";
import "react-toastify/dist/ReactToastify.css";
import { TbMoodEmpty } from "react-icons/tb";
import Task from "./Task";

import TaskContext from "../context/TaskContext";

const TasksToday = () => {
  const { taskList, handleTaskUpdate } = useContext(TaskContext);

  const [tasksToday, setTasksToday] = useState({
    health: [],
    wealth: [],
    knowledge: [],
  });

  // Functions
  const makeTaskList = () => {
    const today = getToday();
    const tasksToday = taskList.filter((task) =>
      task?.taskRepeatsOn?.includes(today)
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
    if (taskList?.length >= 0) {
      makeTaskList();
    }
  }, [taskList]);

  return (
    <div className="tasks-today text-left mt-2 ml-8">
      <h1 className="text-3xl mt-[2.5rem] font-bold text-center">
        FOCUS ON TODAY
      </h1>

      <Task
        category={"Health"}
        taskList={tasksToday.health}
        handleTaskUpdate={handleTaskUpdate}
      />

      <Task
        category={"Wealth"}
        taskList={tasksToday.wealth}
        handleTaskUpdate={handleTaskUpdate}
      />

      <Task
        category={"Knowledge"}
        taskList={tasksToday.knowledge}
        handleTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default TasksToday;
