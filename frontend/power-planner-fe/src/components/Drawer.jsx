import "../styles/drawer.css";
import { AiOutlineMenu } from "react-icons/ai";
import TaskProgress from "./TaskProgress";
import AddTaskModal from "./AddTaskModal";
import XPBar from "./XPBar";

const Drawer = () => {
  return (
    <>
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
              <dialog id="add_task_modal" className="modal">
                <AddTaskModal />
              </dialog>
            </li>

            <li>
              <a href={`/`}>Daily</a>
            </li>
            <li>
              <a href={`/weekly`}>Weekly</a>
            </li>
            <li>
              <a href={`/performance`}>Performance Review</a>
            </li>
            <li>
              <a href={`/stats`}>Stats</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
