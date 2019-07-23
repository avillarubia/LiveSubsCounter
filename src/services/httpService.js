import axios from "axios";
//import logService from "./logServices";
//import { toast } from "react-toastify";

var interceptor = axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //logService.log(error);
    //toast.error("An unexpected error occured");
  }

  return Promise.reject(error);
});

function ejectRequest() {
  axios.interceptors.request.eject(interceptor);
}

export default {
  get: axios.get,
  ejectRequest: ejectRequest()
};
