import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./utility/AppRoutes";
import { customAxios } from "./Services/AxiosHttpCommon";
import Spinner from "./components/layout/Spinner";
import { ToastContainer } from "react-toastify";


function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //request interceptor
    customAxios.interceptors.request.use(
      function (config: any) {
        
        setLoading(true);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
    //response interceptor
    customAxios.interceptors.response.use(
      function (config: any) {
        
        setLoading(false);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
  }, [])

  return (
    <>
      <Spinner show={loading} />
      <ToastContainer />
      <AppRoutes />
    </>
  );
}


export default App;
