import Axios from "axios";
import AuthStore from "../stores/AuthStore";
import commonStore from "../stores/CommonStore";

const API_ROOT = "http://localhost:3000";

const axiosInstance = Axios.create({
  baseURL: API_ROOT,
});

const errorHandler = (err: any) => {
  if (err && err.response && err.response.status === 401) {
    AuthStore.logout();
  }
  return Promise.reject(err.response.data);
};

const successHandler = (res: any) => res.data;

const tokenPlugin = () => {
  if (commonStore.token) {
    return {
      headers: {
        Authorization: `Bearer ${commonStore.token}`,
        "Content-Type": "application/json",
      },
    };
  }
};

const requests = {
  del: (url: any) => axiosInstance.delete(`${url}`, tokenPlugin()),
  get: (url: any) => axiosInstance.get(`${url}`, tokenPlugin()),
  put: (url: any, body: any) =>
    axiosInstance.put(`${url}`, body, tokenPlugin()),
  post: (url: any, body: any) =>
    axiosInstance.post(`${url}`, body, tokenPlugin()),
};

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default requests;
