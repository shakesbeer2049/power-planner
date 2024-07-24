import "../styles/drawer.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { weekDays } from "../utils/weekdays";

const Drawer = () => {
  // Add Task Handler
  const addTaskHandler = () => {
    console.log("add tasks");
  };

  // Route to tasks
  const routeToTasks = (taskCategory) => {};

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-2xl">
            {/* Sidebar content here */}
            <li onClick={addTaskHandler}>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Add Task
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box add-task-modal">
                  <h3 className="font-bold text-lg">Add Task</h3>
                  {/* Task input */}
                  <input
                    type="text"
                    name="add-task-input"
                    id="add-task-input"
                    placeholder="Add a Task"
                  />
                  {/* Task Attributes */}
                  <div className="task-category-div">
                    {/* choose category */}
                    <select
                      name="task-category"
                      id="task-category"
                      className="border-black-500"
                    >
                      <option>Category</option>
                      <option>Health</option>
                      <option>Wealth</option>
                      <option>Knowledge</option>
                    </select>

                    {/* date selection */}
                    {/* <Calendar /> */}
                    <input type="date" name="task-date" id="task-date" />

                    <Select
                      options={weekDays}
                      isMulti
                      placeholder="Repeats on"
                      style={{ "z-index": 5 }}
                    />
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <span className="btn btn-primary text-white mr-5">
                        Save
                      </span>
                      <button className="btn btn-error text-white">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </li>
            <li onClick={() => routeToTasks("weekly")}>
              <a>Weekly</a>
            </li>
            <li onClick={() => routeToTasks("monthly")}>
              <a>Monthly</a>
            </li>
            <li onClick={() => routeToTasks("daily")}>
              <a>Yearly</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
