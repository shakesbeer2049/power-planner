import axios from "axios";
import { callApi } from "./callApi";

const baseUrl = `/tasks`;

export const addTask = async (taskDetails) => {
  try {
    const addTaskRes = await callApi(
      baseUrl,
      "POST",
      taskDetails,
      localStorage.getItem("token")
    );
    return addTaskRes;
  } catch (error) {}
};

export const updateTask = async (updatedTaskDetails) => {
  try {
    const updateTaskRes = await callApi(
      `${baseUrl}/${updatedTaskDetails._id}`,
      "PUT",
      updatedTaskDetails,
      localStorage.getItem("token")
    );

    return updateTaskRes;
  } catch (error) {
    console.log("error in update tasks", error);
  }
};

export const deleteTask = async (taskDetails) => {
  try {
    const deleteTaskRes = await callApi(
      `${baseUrl}/${taskDetails._id}`,
      "DELETE",
      {}
    );
    return deleteTaskRes;
  } catch (error) {
    console.log("error in add tasks", error);
  }
};

export const getTasks = async () => {
  try {
    const getTaskRes = await axios.get(`${baseUrl}`);
    return getTaskRes.data;
  } catch (error) {
    console.log("error in get tasks", error);
  }
};
