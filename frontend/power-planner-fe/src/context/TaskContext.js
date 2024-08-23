import axios from "axios";
import { useState, createContext, useEffect } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import useApiCaller from "../hooks/useApiCaller";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  const url = "http://localhost:3003/api/v1/tasks";
  const testUrl = "http://localhost:3000/data";
  const {
    data: tasks,
    isError: taskError,
    isLoading: tasksLoading,
  } = useApiCaller(url, "GET", {});

  // TASK UPDATE HANDL
  const handleTaskUpdate = async (e, taskToUpdate) => {
    // Update Task
    const updatedTask = { ...taskToUpdate, isCompleted: e.target.checked };
    // Update TaskList in UI
    const updatedList = taskList.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );

    // Update Task on server
    const taskRes = await taskService.updateTask(updatedTask);

    // If task updated
    if (taskRes.status === "success") {
      // update state
      setTaskList(updatedList);

      // If task is completed , show toast
      if (updatedTask.isCompleted)
        toast.success("Well Done, Task Completed.", {
          autoClose: 1000,
          theme: "dark",
        });
    } else
      toast.error("Error in updating task", {
        autoClose: 1000,
        theme: "dark",
      });
  };

  // Task Delete
  const handleTaskDelete = async (taskToDelete) => {
    // console.log("deleted task", taskToDelete);
    const updatedList = taskList.filter(
      (task) => task._id !== taskToDelete._id
    );
    setTaskList(updatedList);
    const taskRes = await taskService.deleteTask(taskToDelete);
    if (taskRes === "success") {
      toast.success("Task Deleted!");
    } else {
      toast.error("Error! Please try again!");
    }
  };

  // Effects
  useEffect(() => {
    if (!tasksLoading && !taskError) {
      setTaskList(tasks.tasks);
    }
    // console.log("Rerender in Context Comp");
  }, [tasksLoading, tasks]);

  return (
    <TaskContext.Provider
      value={{ taskList, setTaskList, handleTaskUpdate, handleTaskDelete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
