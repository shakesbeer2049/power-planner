import { useEffect, useState } from "react";
import axios from "axios";
export default function useApiCaller(url, callType, body) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) throw "Unauthorized";
    const apiCaller = async () => {
      if (!url) {
        setIsError(new Error("URL is required"));
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          method: callType,
          url: url || "",
          data: body || {},
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        };
        const response = await axios(config);
        const data = response.data.data;
        setData(data);
      } catch (error) {
        console.log(error, "error in fetching data");
        setIsError(error);
        if (
          error.message == "Request failed with status code 401" ||
          error == "Unauthorized"
        )
          window.location.href = "https://power-planner-fe-rpuw.onrender.com";
      } finally {
        setIsLoading(false);
      }
    };

    apiCaller();
  }, [url]);

  const refetch = async () => {
    if (!url) {
      setIsError(new Error("URL is required"));
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        method: callType,
        url: url || "",
        data: body || {},
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      const data = response.data.data;
      setData(data);
    } catch (error) {
      console.log(error, "error in fetching data");
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, refetch };
}
