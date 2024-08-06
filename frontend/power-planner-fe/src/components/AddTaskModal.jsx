import { nanoid } from "nanoid";
import { useState } from "react";
import Select from "react-select";
import { weekDays } from "../utils/weekdays";
import * as taskService from "../utils/taskService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTaskModal = () => {
  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    taskRepeatsOn: [],
    taskCategory: "",
  });

  //handle task input
  const handleTaskInput = (e) => {
    setTaskDetails({ ...taskDetails, taskName: e.target.value });
  };

  // Add Task Handler
  const addTaskHandler = async () => {
    console.log("add tasks", taskDetails);

    const repeatsOn = taskDetails.taskRepeatsOn?.map((repeat) => repeat.value);

    let taskObj = {
      id: nanoid(),
      taskName: taskDetails.taskName,
      taskCategory: taskDetails.taskCategory,
      taskRepeatsOn: repeatsOn,
      date: new Date().toISOString(),
      isCompleted: false,
    };

    let formValid = true;
    if (!taskObj.taskName) formValid = false;
    else if (!taskObj.taskCategory) formValid = false;
    else if (!taskObj.taskRepeatsOn) formValid = false;

    if (formValid) {
      console.log(taskObj);
      const res = await taskService.addTask(taskObj);
      setTaskDetails({
        taskName: "",
        taskRepeatsOn: [{}],
        taskCategory: "",
      });
      toast.success("Task Added.", {
        autoClose: 3000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
      console.log("res", res);
    } else {
      toast.warning("Please fill all the task details!", {
        autoClose: 3000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
    }
  };

  // task repeats on handler
  const taskRepeatsOnHandler = (e) => {
    console.log(e);
    setTaskDetails({ ...taskDetails, taskRepeatsOn: e });
  };

  // Route to tasks
  const routeToTasks = (taskCategory) => {};

  // Handle Task Category
  const taskCategoryHandler = (e) => {
    // console.log(e.target.value)
    setTaskDetails({ ...taskDetails, taskCategory: e.target.value });
  };
  return (
    <>
      <div className="modal-box add-task-modal">
        <h3 className="font-bold text-xl text-center mb-4">Add Task</h3>
        {/* Task input */}
        <input
          type="text"
          name="add-task-input"
          id="add-task-input"
          placeholder="Add a Task"
          onChange={handleTaskInput}
          value={taskDetails.taskName}
          className="input input-bordered w-full max-w-xs"
        />
        {/* Task Attributes */}
        <div className="task-category-div">
          {/* choose category */}
          <select
            name="task-category"
            id="task-category"
            className="select select-bordered w-full max-w-xs mb-4"
            onChange={taskCategoryHandler}
            value={taskDetails.taskCategory}
          >
            <option value="">Category</option>
            <option value={"health"}>Health</option>
            <option value={"wealth"}>Wealth</option>
            <option value={"knowledge"}>Knowledge</option>
          </select>

          {/* date selection */}
          {/* <input type="date" name="task-date" id="task-date" /> */}

          <Select
            options={weekDays}
            isMulti
            hideSelectedOptions={false}
            allowSelectAll={true}
            placeholder="Repeats on"
            style={{ "z-index": 5 }}
            onChange={taskRepeatsOnHandler}
            // closeMenuOnSelect={false}
            blurInputOnSelect={false}
          />
        </div>
        <div className="modal-action">
          <form method="dialog" id="save-cancel-task">
            {/* if there is a button in form, it will close the modal */}
            <span
              className="btn btn-success text-white mr-5"
              onClick={addTaskHandler}
            >
              Save
            </span>
            <button className="btn btn-error text-white">Cancel</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTaskModal;
