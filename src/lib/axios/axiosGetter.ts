import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

const axiosGetter = async (url: string) => {
  return axiosInstance
    .get(url)
    .then((resp) => {
      const { data } = resp;
      return data?.attributes ?? data;
    })
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
};

export default axiosGetter;
