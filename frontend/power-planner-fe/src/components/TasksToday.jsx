import { useEffect, useState } from "react";
import { getToday } from "../utils/daysAndDates";
import "../styles/tasksToday.css";
import DeleteTaskModal from "./DeleteTaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { TbMoodEmpty } from "react-icons/tb";

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
      <h1 className="text-3xl mt-[2.5rem] font-bold text-center">FOCUS ON TODAY</h1>

      <div className="tasks">
        <h2 className="text-2xl font-bold mb-4 text-center">Health</h2>
        {tasksToday.health.length > 0 ? (
          tasksToday.health.map((task) => (
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
          ))
        ) : (
          <span>
            <TbMoodEmpty className="inline" /> So Empty!
          </span>
        )}
      </div>

      <div className="tasks">
        <h2 className="text-2xl font-bold mb-4 text-center">Knowledge</h2>
        {tasksToday.wealth.length > 0 ? (
          tasksToday.wealth.map((task) => (
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
          ))
        ) : (
          <span>
            <TbMoodEmpty className="inline" /> So Empty!
          </span>
        )}
      </div>

      <div className="tasks">
        <h2 className="text-2xl font-bold mb-4 text-center">Wealth</h2>
        {tasksToday.knowledge.length > 0 ? (
          tasksToday.knowledge.map((task) => (
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
          ))
        ) : (
          <span>
            <TbMoodEmpty className="inline" /> So Empty!
          </span>
        )}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default TasksToday;
