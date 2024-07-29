import axios from "axios";
import { useState, createContext, useEffect } from "react";
import * as taskService from "../utils/taskService";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  const getTasks = async () => {
    const taskRes = await axios.get("http://localhost:3000/tasks");
    console.log("taskRes", taskRes);
    const taskData = taskRes.data;
    setTaskList(taskData);
  };

  useEffect(() => {
    const callTasks = async () => {
      await getTasks();
    };
    callTasks();
  }, []);

  const handleTaskUpdate = async (e, taskToUpdate) => {
    console.log("taskToUpdate", taskToUpdate);
    taskToUpdate = { ...taskToUpdate, isCompleted: e.target.checked };
    const updatedList = taskList.map((task) =>
      task.id === taskToUpdate.id ? taskToUpdate : task
    );
    setTaskList(updatedList);

    const taskRes = await taskService.updateTask(taskToUpdate);
    if (taskRes.status == 200 || taskRes.status == 201) {
      console.log("updated task sucessfully");
    } else console.log("failed to update task");
  };

  return (
    <TaskContext.Provider value={{ taskList, setTaskList, handleTaskUpdate }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
