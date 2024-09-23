import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import useApiCaller from "../hooks/useApiCaller";
import AuthContext from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { callApi } from "../utils/callApi";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const { setUserDetails, userDetails } = useContext(AuthContext);

  // Initial user details fetch
  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("token");
      let userId = "";

      if (jwt) {
        userId = jwtDecode(jwt).id;
        if (userId) {
          const verifyUser = await callApi("/home", "GET", {}, jwt);
          if (verifyUser.status === "success") {
            setUserDetails(verifyUser.data);
          }
        }
      }
    })();
  }, []);

  // Initial Task fetch
  const url = "https://power-planner-1.onrender.com/api/v1/tasks";
  const testUrl = "http://localhost:3000/data";
  const localUrl = "http://localhost:3003/api/v1/"
  const {
    data: taskData,
    isError: taskError,
    isLoading: tasksLoading,
  } = useApiCaller(localUrl, "GET", {}, userDetails._id);

  // Effects
  useEffect(() => {
    if (!tasksLoading && !taskError) {
      setTaskList(taskData.tasks);
    }
  }, [tasksLoading, taskData]);

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
      setUserDetails(taskRes.data.user);

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
    if (taskToDelete.isCompleted) {
      toast.error("Cannot delete a completed task");
      return;
    }
    const taskRes = await taskService.deleteTask(taskToDelete);
    if (taskRes.status === "success") {
      toast.success("Task Deleted!");
      const updatedList = taskList.filter(
        (task) => task._id !== taskToDelete._id
      );
      setTaskList(updatedList);
    } else {
      toast.error("Error! Please try again!");
    }
  };

  return (
    <TaskContext.Provider
      value={{ taskList, setTaskList, handleTaskUpdate, handleTaskDelete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
