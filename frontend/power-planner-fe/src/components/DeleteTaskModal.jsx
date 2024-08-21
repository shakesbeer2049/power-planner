import * as taskService from "../utils/taskService";
import { toast } from "react-toastify";

const DeleteTaskModal = ({ task,taskList, setTaskList }) => {
  const handleTaskDelete = async (taskToDelete) => {
    // console.log("deleted task", taskToDelete);
    const updatedList = taskList.filter(
      (task) => task._id !== taskToDelete._id
    );
    setTaskList(updatedList);
    const taskRes = await taskService.deleteTask(taskToDelete);
    if (taskRes === "success") {
      toast.success("Task Deleted!");
    } else {
      toast.error("Error! Please try again!");
    }
  };
  return (
    <>
      <dialog id={task._id} className="modal">
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
