import React from "react";
import "./styles/App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Drawer from "./components/Drawer";
import { TaskProvider } from "./context/TaskContext";
import WeeklyTasks from "./components/WeeklyTasks";
import TasksToday from "./components/TasksToday";
import Stats from "./components/Stats";
import Performance from "./components/Performance";

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
      path: "/weekly",
      element: (
        <TaskProvider>
          <WeeklyTasks />
        </TaskProvider>
      ),
    },
    {
      path: "/stats",
      element: (
        <TaskProvider>
          <Stats />
        </TaskProvider>
      ),
    },
    {
      path: "/performance",
      element: (
        <TaskProvider>
          <Performance />
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
