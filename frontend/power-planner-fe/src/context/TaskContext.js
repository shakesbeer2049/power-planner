import axios from "axios";
import { useState, createContext, useEffect } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import { getToday } from "../utils/daysAndDates";
import useApiCaller from "../hooks/useApiCaller";
import { calculateDailyProgress } from "../utils/taskCalculations";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const {
    data: tasks,
    isError: taskError,
    isLoading: tasksLoading,
  } = useApiCaller("http://localhost:3003/api/v1/tasks", "GET", {});

  const [taskList, setTaskList] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!tasksLoading && !taskError) {
      setTaskList(tasks.tasks);
    }
    console.log("Rerender in Context Comp")
  }, [tasksLoading, tasks]);

  // TASK UPDATE HANDLER
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
      setCounter(prev => prev+1);
      console.log("task updated in context");

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

  return (
    <TaskContext.Provider value={{ taskList, setTaskList, handleTaskUpdate, counter, setCounter }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
