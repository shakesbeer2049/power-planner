import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import { getDaysLeft } from "../utils/daysAndDates";
import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";

const AddTaskModal = () => {
  const { taskList, setTaskList } = useContext(TaskContext);
  const { userDetails } = useContext(AuthContext);

  const [taskDetails, setTaskDetails] = useState({
    taskName: "",
    taskRepeatsOn: "",
    taskCategory: "",
  });

  //handle task input
  const handleTaskInput = (e) => {
    setTaskDetails({ ...taskDetails, taskName: e.target.value });
  };

  // Add Task Handler
  const addTaskHandler = async () => {
    const repeatsOn = taskDetails.taskRepeatsOn?.map((repeat) => repeat.value);

    // Task object
    let taskObj = {
      taskName: taskDetails.taskName,
      taskCategory: taskDetails.taskCategory,
      taskRepeatsOn: repeatsOn,
      isCompleted: false,
      relatedUserId: userDetails._id,
    };

    // validate fields
    let formValid = true;
    if (
      !taskObj.taskName ||
      !taskObj.taskCategory ||
      !taskObj.taskRepeatsOn.length
    )
      formValid = false;

    if (formValid) {
      const taskArray = [];
      if (taskObj.taskRepeatsOn.length > 0) {
        for (const element of taskObj.taskRepeatsOn) {
          taskArray.push({
            ...taskObj,
            taskRepeatsOn: element,
            _id: uuidv4(),
          });
        }
      }
      const res = await taskService.addTask(taskArray);

      if (res.status === "success") {
        taskObj._id = res.data._id;
        const newTaskList = [...taskList, ...taskArray];
        setTaskList(newTaskList);
        setTaskDetails({ ...taskDetails, taskName: "" });
        toast.success("Task Added.", {
          autoClose: 1000,
          theme: "dark",
          pauseOnFocusLoss: false,
          closeOnClick: true,
        });
      } else window.alert("error in adding Task");
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
    setTaskDetails({ ...taskDetails, taskCategory: e.target.value });
  };

  const selectStyles = {
    container: (css) => ({ ...css, width: "250px" }),
  };
  return (
    <div className="modal-box add-task-modal">
      <h3 className="font-bold text-xl text-center mb-4">Add Task</h3>
      {/* Task input */}
      <div className="add-task-content lg:text-center">
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

          <div className="react-select lg:ml-20">
            <Select
              options={getDaysLeft()}
              isMulti
              hideSelectedOptions={true}
              allowSelectAll={true}
              placeholder="Do this task on"
              style={{ "z-index": 5 }}
              onChange={taskRepeatsOnHandler}
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              value={taskDetails.taskRepeatsOn}
              maxMenuHeight={"100px"}
              styles={selectStyles}
            />
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" id="save-cancel-task">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-primary text-white mr-5"
              onClick={addTaskHandler}
            >
              Save
            </button>
            <button className="btn btn-error text-white">Close</button>
          </form>
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
