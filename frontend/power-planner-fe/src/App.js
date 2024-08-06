import React from "react";
import "./styles/App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Drawer from "./components/Drawer";
import { TaskProvider } from "./context/TaskContext";
import WeeklyTasks from "./components/WeeklyTasks";
import TasksToday from "./components/TasksToday";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <TaskProvider>
          <TasksToday />
        </TaskProvider>
      ),
    },
    {
      path: "/daily",
      element: (
        <TaskProvider>
          <TasksToday />
        </TaskProvider>
      ),
    },
    {
      path: "/weekly",
      element: (
        <TaskProvider>
          <WeeklyTasks />
        </TaskProvider>
      ),
    },
  ]);
  return (
    <>
      <TaskProvider>
        <Drawer />
      </TaskProvider>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
