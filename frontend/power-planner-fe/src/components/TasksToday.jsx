import { useContext, useEffect, useState } from "react";
import { getToday } from "../utils/weekdays";
import "../styles/tasksToday.css";
import TaskContext from "../context/TaskContext";
import * as taskService from "../utils/taskService";
import { IoTrashBin } from "react-icons/io5";
import DeleteTaskModal from "./DeleteTaskModal";
const TasksToday = ({}) => {
  const { taskList, setTaskList, handleTaskUpdate } = useContext(TaskContext);
  const [tasksToday, setTasksToday] = useState({
    health: [],
    wealth: [],
    knowledge: [],
  });

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
    // console.log("taskList in useEffect", taskList);
    if (taskList?.length > 0) makeTaskList();
  }, [taskList]);

  return (
    <div className="tasks-today text-left mt-16 ml-8">
      <h1 className="text-3xl font-bold text-center">FOCUS ON TODAY</h1>

      <h2 className="text-2xl font-bold mb-4">Health</h2>

      <div className="tasks">
        {tasksToday.health.map((task) => (
          <div className="task-h1-input">
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
              onClick={(e) => document.getElementById(task.id).showModal()}
              key={task.id}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.taskName}
            </h4>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Knowledge</h2>
      <div className="tasks">
        {tasksToday.wealth.map((task) => (
          <div className="task-h1-input">
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
              onClick={(e) => document.getElementById(task.id).showModal()}
              key={task.id}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.taskName}
            </h4>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Wealth</h2>
      <div className="tasks">
        {tasksToday.knowledge.map((task) => (
          <div className="task-h1-input">
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
              onClick={(e) => document.getElementById(task.id).showModal()}
              key={task.id}
              className={task.isCompleted ? "completed" : ""}
            >
              {task.taskName}
            </h4>
          </div>
        ))}
      </div>
      {/* delete task modal */}
    </div>
  );
};

export default TasksToday;
