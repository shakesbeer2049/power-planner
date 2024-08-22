import { useEffect, useState } from "react";
import { getToday } from "../utils/daysAndDates";
import "../styles/tasksToday.css";
import DeleteTaskModal from "./DeleteTaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

import TaskContext from "../context/TaskContext";

const TasksToday = () => {
  const { taskList, setTaskList, handleTaskUpdate } = useContext(TaskContext);

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
    //  console.log("tasks today", tasksToday);
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
      console.log("Rerender in Tasks Today Comp", taskList.length);
      makeTaskList();
    }
  }, [taskList]);

  return (
    <div className="tasks-today text-left mt-16 ml-8 lg:mt-0">
      <h1 className="text-3xl font-bold text-center">FOCUS ON TODAY</h1>

      <div className="tasks">
        <h2 className="text-2xl font-bold mb-4">Health</h2>
        {tasksToday.health.map((task) => (
          <div key={task._id} className="task-h1-input">
            <DeleteTaskModal task={task} />{" "}
            <input
              type="checkbox"
              checked={task.isCompleted}
              className="checkbox checkbox-accent"
              name="task"
              id="task"
              onChange={(e) => {
                handleTaskUpdate(e, task);
              }}
            />{" "}
            <h4
              onClick={(e) => document.getElementById(task._id).showModal()}
              key={task._id}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.taskName}
            </h4>
          </div>
        ))}
      </div>

      <div className="tasks">
        <h2 className="text-2xl font-bold mb-4">Knowledge</h2>
        {tasksToday.wealth.map((task) => (
          <div key={task._id} className="task-h1-input">
            <DeleteTaskModal task={task} />{" "}
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              checked={task.isCompleted}
              name="task"
              // id="task"
              onChange={(e) => {
                handleTaskUpdate(e, task);
              }}
            />{" "}
            <h4
              onClick={(e) => document.getElementById(task._id).showModal()}
              key={task._id}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.taskName}
            </h4>
          </div>
        ))}
      </div>

      <div className="tasks">
        <h2 className="text-2xl font-bold mb-4">Wealth</h2>
        {tasksToday.knowledge.map((task) => (
          <div key={task._id} className="task-h1-input">
            <DeleteTaskModal task={task} />{" "}
            <input
              className="checkbox checkbox-accent"
              type="checkbox"
              checked={task.isCompleted}
              name="task"
              // id="task"
              onChange={(e) => {
                handleTaskUpdate(e, task);
              }}
            />{" "}
            <h4
              onClick={(e) => document.getElementById(task._id).showModal()}
              key={task._id}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.taskName}
            </h4>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TasksToday;
