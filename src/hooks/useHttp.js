import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
   const response = await fetch(url, config);
   const resData = await response.json();

   if (!response.ok) {
      throw new Error(resData.message || "Something went wrong, failed to send request");
   }

   return resData;
};

function useHttp(url, config, initiaData) {
   const [data, setData] = useState(initiaData);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const sendRequest = useCallback(() => {
      const sendRequestTx = async () => {
         setIsLoading(true);

         try {
            const resData = await sendHttpRequest(url, config);
            setData(resData);
         } catch (err) {
            setError(err.message || "Something went wrong!");
         }

         setIsLoading(false);
      };
      sendRequestTx();
   }, [url, config]);

   useEffect(() => {
      if ((config && (config.method === "GET" || !config.method)) || !config) {
         sendRequest();
      }
   }, [sendRequest, config]);

   return {
      isLoading,
      error,
      data,
      sendRequest,
   };
}

export default useHttp;
