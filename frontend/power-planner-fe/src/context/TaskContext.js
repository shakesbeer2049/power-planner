import axios from "axios";
import { useState, createContext, useEffect } from "react";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import { getToday } from "../utils/weekdays";
const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [dailyProgressCount, setDailyProgressCount] = useState({
    totalCount: 0,
    completedTasks: 0,
  });

  const getTasks = async () => {
    const taskRes = await axios.get("http://localhost:3000/tasks");
    console.log("taskRes", taskRes);
    const taskData = taskRes.data;
    setTaskList(taskData);
    const [dailyTaskCount, completedTasks] = calculateDailyProgress(taskData);
    setDailyProgressCount({
      totalCount: dailyTaskCount,
      completedTasks: completedTasks,
    });

    console.log("dailyTaskCount", dailyTaskCount);
  };

  const calculateDailyProgress = (taskData) => {
    const tasksToday = taskData.filter((task) =>
      task.taskRepeatsOn.includes(getToday())
    );
    const dailyTaskCount = tasksToday.length;
    const completedTasks = tasksToday.filter((task) => task.isCompleted);

    return [dailyTaskCount, completedTasks.length];
  };

  useEffect(() => {
    const callTasks = async () => {
      await getTasks();
    };
    callTasks();
  }, []);

  // TASK UPDATE HANDLER
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
      if (taskToUpdate.isCompleted)
        toast.success("Well Done, Task Completed.", {
          autoClose: 3000,
          theme: "dark",
        });
    } else console.log("failed to update task");
  };

  return (
    <TaskContext.Provider
      value={{ taskList, setTaskList, handleTaskUpdate, dailyProgressCount }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
