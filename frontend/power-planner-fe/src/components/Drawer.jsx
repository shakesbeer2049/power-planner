import "../styles/drawer.css";
import { AiOutlineMenu } from "react-icons/ai";
import TaskProgress from "./TaskProgress";
import AddTaskModal from "./AddTaskModal";
import XPBar from "./XPBar";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";

import TaskContext from "../context/TaskContext";

const Drawer = ({ selectedMenu, setSelectedMenu }) => {
  const { taskList, setTaskList } = useContext(TaskContext);

  return (
    <>
      <div className="main-model lg:flex">
        <div className="drawer lg:drawer-open drawer-container">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <div className="side-menu-xp-bar">
              {/* SIDE MENU TOGGLE */}
              <label
                htmlFor="my-drawer-2"
                className="drawer-button lg:hidden text-5xl"
                id="side-menu-toggle"
              >
                <AiOutlineMenu />
              </label>
              {/* XP BAR */}
              <XPBar />
            </div>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-2xl">
              {/* Sidebar content here */}
              <div className="task-progress">
                <TaskProgress title={"Today"} />
              </div>
              <li>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    document.getElementById("add_task_modal").showModal()
                  }
                >
                  Add Task
                </button>
                <dialog id="add_task_modal" className="modal lg:mb-8">
                  <AddTaskModal />
                </dialog>
              </li>
              <br />
              <li
                onClick={() => setSelectedMenu("daily")}
                className={selectedMenu === "daily" ? "selected-menu" : ""}
              >
                <Link to="/">Daily</Link>
              </li>
              <li
                onClick={() => setSelectedMenu("weekly")}
                className={selectedMenu === "weekly" ? "selected-menu" : ""}
              >
                <Link to="/weekly">Weekly</Link>
              </li>
              <li
                onClick={() => setSelectedMenu("performance")}
                className={
                  selectedMenu === "performance" ? "selected-menu" : ""
                }
              >
                <Link to="/performance">Performance</Link>
              </li>
              <li
                onClick={() => setSelectedMenu("stats")}
                className={selectedMenu === "stats" ? "selected-menu" : ""}
              >
                <Link to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="outlet w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Drawer;
