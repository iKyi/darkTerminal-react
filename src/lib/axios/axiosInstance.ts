import axios from "axios";

const axiosInstance = axios.create({
  timeout: 120000,
});

export default axiosInstance;
