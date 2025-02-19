import axios from "axios";

export const callApi = async (url, method, body) => {
  const jwt = localStorage.getItem("token");
  const baseURL = "http://localhost:3003/api/v1";
  // const baseURL = "https://power-planner-1.onrender.com/api/v1";
  if (!url) {
    throw new Error("URL is required");
  }

  try {
    const config = {
      method: method,
      url: baseURL + url,
      data: body || {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}` || "",
      },
    };
    // console.log("axios config", config);
    const response = await axios(config);
    // console.log("axios response", response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error, "error in fetching data");
    if (error.message === "Request failed with status code 401")
      return error.response.data;
    return error;
  }
};
