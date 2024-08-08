import axios from "axios";
const baseUrl = `http://localhost:3000/tasks`;

export const addTask = async (taskDetails) => {
  try {
    console.log("taskDetils", taskDetails);
    const addTaskRes = await axios.post(baseUrl, taskDetails);
    return addTaskRes;
  } catch (error) {
    console.log("error in add tasks", error);
  }
};

export const updateTask = async (updatedTaskDetails) => {
  try {
    const updateTaskRes = await axios.put(
      `${baseUrl}/${updatedTaskDetails.id}`,
      updatedTaskDetails
    );
    return updateTaskRes;
  } catch (error) {
    console.log("error in update tasks", error);
  }
};

export const deleteTask = async (taskDetails) => {
  try {
    const deleteTaskRes = await axios.delete(`${baseUrl}/${taskDetails.id}`);
    console.log("deleteTaskRes", deleteTaskRes);
  } catch (error) {
    console.log("error in add tasks", error);
  }
};

export const getTasks = async () => {
  try {
    const getTaskRes = await axios.get(`${baseUrl}`);
    console.log(getTaskRes);
    return getTaskRes.data;
  } catch (error) {
    console.log("error in get tasks", error);
  }
};
