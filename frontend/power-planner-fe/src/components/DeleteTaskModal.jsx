import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import * as taskService from "../utils/taskService";

const DeleteTaskModal = ({ task }) => {
  const { taskList, setTaskList, handleTaskUpdate } = useContext(TaskContext);
  const handleTaskDelete = async (taskToDelete) => {
    console.log("deleted task", taskToDelete);
    const updatedList = taskList.filter((task) => task.id !== taskToDelete.id);
    setTaskList(updatedList);
    const taskRes = await taskService.deleteTask(taskToDelete);
    // console.log("delete task res", taskRes);
    // if (taskRes.status == 200 || taskRes.status == 201) {
    //   console.log("updated task sucessfully");
    // } else console.log("failed to update task");
    // document.getElementById(task.id).close();
  };
  return (
    <>
      <dialog id={task.id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete this task!</h3>
          <p className="py-4">Click Delete to confirm or Close to cancel.</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => handleTaskDelete(task)}
            >
              Delete
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteTaskModal;
