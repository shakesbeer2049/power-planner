import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Drawer from "./components/Drawer";
import WeeklyTasks from "./components/WeeklyTasks";
import TasksToday from "./components/TasksToday";
import Stats from "./components/Stats";
import Performance from "./components/Performance";
import useApiCaller from "./hooks/useApiCaller";
import * as taskService from "./utils/taskService";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("daily");
  const [taskList, setTaskList] = useState([]);

  const {
    data: tasks,
    isError: taskError,
    isLoading: tasksLoading,
  } = useApiCaller("http://localhost:3003/api/v1/tasks", "GET", {});

  useEffect(() => {
    if (!tasksLoading && !taskError) {
      setTaskList(tasks.tasks);
    }
    console.log("Rerender in Context Comp");
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Drawer
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          taskList={taskList}
          setTaskList={setTaskList}
        />
      ),
      children: [
        {
          path: "/",
          element: (
            <TasksToday
              taskList={taskList}
              setTaskList={setTaskList}
              handleTaskUpdate={handleTaskUpdate}
            />
          ),
        },
        {
          path: "/weekly",
          element: (
            <WeeklyTasks
              taskList={taskList}
              handleTaskUpdate={handleTaskUpdate}
            />
          ),
        },
        {
          path: "/stats",
          element: <Stats taskList={taskList} />,
        },
        {
          path: "/performance",
          element: <Performance />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
