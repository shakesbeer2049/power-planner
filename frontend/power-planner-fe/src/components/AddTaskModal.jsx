import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { weekDays } from "../utils/daysAndDates";
import * as taskService from "../utils/taskService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskContext from "../context/TaskContext";

const AddTaskModal = () => {
  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    taskRepeatsOn: [],
    taskCategory: "",
  });

  const { setTaskList, taskList } = useContext(TaskContext);

  //handle task input
  const handleTaskInput = (e) => {
    setTaskDetails({ ...taskDetails, taskName: e.target.value });
  };

  useEffect(() => {
    console.log("Rerender in Add Task Modal Comp");
  }, [taskList]);

  // Add Task Handler
  const addTaskHandler = async () => {
    const repeatsOn = taskDetails.taskRepeatsOn?.map((repeat) => repeat.value);

    // Task object
    let taskObj = {
      taskName: taskDetails.taskName,
      taskCategory: taskDetails.taskCategory,
      taskRepeatsOn: repeatsOn,
      isCompleted: false,
    };

    // validate fields
    let formValid = true;
    if (!taskObj.taskName) formValid = false;
    else if (!taskObj.taskCategory) formValid = false;
    else if (!taskObj.taskRepeatsOn) formValid = false;

    if (formValid) {
      const res = await taskService.addTask(taskObj);
      const newTaskList = [...taskList, taskObj];
      setTaskList(newTaskList);
      setTaskDetails({ ...taskDetails, taskName: "" });
      toast.success("Task Added.", {
        autoClose: 1000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
    } else {
      toast.warning("Please fill all the task details!", {
        autoClose: 1000,
        theme: "dark",
        pauseOnFocusLoss: false,
        closeOnClick: true,
      });
    }
  };

  // task repeats on handler
  const taskRepeatsOnHandler = (e) => {
    setTaskDetails({ ...taskDetails, taskRepeatsOn: e });
  };

  // Handle Task Category
  const taskCategoryHandler = (e) => {
    // console.log(e.target.value)
    setTaskDetails({ ...taskDetails, taskCategory: e.target.value });
  };

  const selectStyles = {
    container: (css) => ({ ...css, width: "250px" }),
  };
  return (
    <>
      <ToastContainer />
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
            hideSelectedOptions={true}
            allowSelectAll={true}
            placeholder="Repeats on"
            style={{ "z-index": 5 }}
            onChange={taskRepeatsOnHandler}
            closeMenuOnSelect={false}
            blurInputOnSelect={false}
            value={taskDetails.taskRepeatsOn}
            styles={selectStyles}
          />
        </div>
        <div className="modal-action">
          <form method="dialog" id="save-cancel-task">
            {/* if there is a button in form, it will close the modal */}
            <span
              className="btn btn-primary text-white mr-5"
              onClick={addTaskHandler}
            >
              Save
            </span>
            <button className="btn btn-error text-white">Close</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModal;
