import "../styles/drawer.css";
import Select from "react-select";
import { weekDays } from "../utils/weekdays";
import { useState } from "react";
const Drawer = () => {

  const [taskCategory, setTaskCategory] = useState("");
  const [taskRepeatsOn, setTaskRepeatsOn] = useState(null);
  const [taskName, setTaskName] = useState("");

//handle task input
const handleTaskInput = (e) => {
  setTaskName(e.target.value);
}

  // Add Task Handler
  const addTaskHandler = () => {
    console.log("add tasks");
    const repeatsOn = taskRepeatsOn?.map(repeat => repeat.value);

    let taskObj = {
      taskName : taskName,
      taskCategory:taskCategory,
      taskRepeatsOn : repeatsOn
    }

    console.log(taskObj)
  };

  // task repeats on handler
  const taskRepeatsOnHandler = (e) => {
    setTaskRepeatsOn(e);
  }

  // Route to tasks
  const routeToTasks = (taskCategory) => {};

  // Handle Task Category
  const taskCategoryHandler = (e) => {
    // console.log(e.target.value)
    setTaskCategory(e.target.value)
  }

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
                  <h3 className="font-bold text-xl text-center">Add Task</h3>
                  {/* Task input */}
                  <input
                    type="text"
                    name="add-task-input"
                    id="add-task-input"
                    placeholder="Add a Task"
                    onChange={handleTaskInput}
                  />
                  {/* Task Attributes */}
                  <div className="task-category-div">
                    {/* choose category */}
                    <select
                      name="task-category"
                      id="task-category"
                      className="border-black-500 mb-3"
                      onChange={taskCategoryHandler}
                    >
                      <option>Category</option>
                      <option>Health</option>
                      <option>Wealth</option>
                      <option>Knowledge</option>
                    </select>

                    {/* date selection */}
                    {/* <input type="date" name="task-date" id="task-date" /> */}

                    <Select
                      options={weekDays}
                      isMulti
                      closeMenuOnSelect = {false}
                      hideSelectedOptions = {false}
                      allowSelectAll = {true}
                      placeholder="Repeats on"
                      style={{ "z-index": 5 }}
                      onChange={taskRepeatsOnHandler}
                    />
                  </div>
                  <div className="modal-action">
                    <form method="dialog" id="save-cancel-task">
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
