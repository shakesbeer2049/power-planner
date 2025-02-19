import DeleteTaskModal from "./DeleteTaskModal";
import { TbMoodEmpty } from "react-icons/tb";
import "../styles/Task.css";
const Task = ({ category, taskList, handleTaskUpdate }) => {
  return (
    <div className="tasks">
      <h2 className="text-2xl font-bold mb-4 text-center">{category}</h2>
      <ul>
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <li key={task._id} className="task-h1-input">
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
            </li>
          ))
        ) : (
          <span>
            <TbMoodEmpty className="inline" /> So Empty!
          </span>
        )}
      </ul>
    </div>
  );
};

export default Task;
