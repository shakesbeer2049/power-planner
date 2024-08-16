import { useEffect, useState } from "react";
import axios from "axios";
export default function useApiCaller(url, callType, body ) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
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
          },
        };

        const response = await axios(config);
        const data = response.data.data;
        console.log("data from useFetch", data);
        setData(data);
      } catch (error) {
        console.log(error, "error in fetching data");
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    apiCaller();
  }, [url]);

  return { data, isLoading, isError };
}
