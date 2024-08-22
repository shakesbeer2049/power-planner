import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Drawer from "./components/Drawer";
import WeeklyTasks from "./components/WeeklyTasks";
import TasksToday from "./components/TasksToday";
import Stats from "./components/Stats";
import Performance from "./components/Performance";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const [selectedMenu, setSelectedMenu] = useState("daily");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <TaskProvider>
          <Drawer
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        </TaskProvider>
      ),
      children: [
        {
          path: "/",
          element: <TasksToday />,
        },
        {
          path: "/weekly",
          element: <WeeklyTasks />,
        },
        {
          path: "/stats",
          element: <Stats />,
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
