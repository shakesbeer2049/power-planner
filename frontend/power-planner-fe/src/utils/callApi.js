import axios from "axios";

export const callApi = async (url, method, body) => {
  const baseURL = "http://localhost:3003/api/v1";
  if (!url) {
    throw "URL is required";
  }

  try {
    const config = {
      method: method,
      url: baseURL + url,
      data: body || {},
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios(config);
    console.log("axios response", response);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error, "error in fetching data");
    if (error.message == "Request failed with status code 401")
      return error.response.data;
    return error;
  }
};
