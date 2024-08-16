import axios from "axios";
import { useState, createContext, useEffect } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import { getToday } from "../utils/weekdays";
import useApiCaller from "../hooks/useApiCaller";
import { calculateDailyProgress } from "../utils/taskCalculations";

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const {data:tasks, isError:taskError, isLoading:tasksLoading} = useApiCaller("http://localhost:3003/api/v1/tasks","GET", {});

  const [taskList, setTaskList] = useState([]);
  

  useEffect(() => {
    if (!tasksLoading && tasks) {
      // Update the taskList and calculate the dailyProgressCount together
      setTaskList(tasks.tasks);
      // const percentCompleted = calculateDailyProgress(tasks.tasks);
      // setDailyProgressCount(percentCompleted);
    }
  }, [tasks, tasksLoading]);

  // TASK UPDATE HANDLER
  const handleTaskUpdate = async (e, taskToUpdate) => {
    console.log(e.target.checked, taskToUpdate)
    // Update Task
    const updatedTask = { ...taskToUpdate, isCompleted: e.target.checked };
    console.log(updatedTask,"updatedTask")
    // Update TaskList in UI
    const updatedList = taskList.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );

    console.log(updatedList,"updatedilist")

    // Update Task on server
    const taskRes = await taskService.updateTask(updatedTask);
    
    console.log(taskRes,"taskRes")

    // If task updated 
    if (taskRes.status === "success") {
      // update state
      setTaskList((prevTaskList) => {
        const updatedList = prevTaskList.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        // const percentCompleted = calculateDailyProgress(updatedList);
        // setDailyProgressCount(percentCompleted);
        return updatedList;
      });

      // If task is completed , show toast
      if (updatedTask.isCompleted)
        toast.success("Well Done, Task Completed.", {
          autoClose: 1000,
          theme: "dark",
        });
    } else toast.error("Error in updating task", {
      autoClose: 1000,
      theme: "dark",
    });
  };

  return (
    <TaskContext.Provider
      value={{ taskList, setTaskList, handleTaskUpdate }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
