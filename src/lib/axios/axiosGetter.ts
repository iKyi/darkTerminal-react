import axiosInstance from "./axiosInstance";

const axiosGetter = async (url: string) => {
  return axiosInstance.get(url).then((resp) => {
    const { data } = resp;
    return data?.attributes ?? data;
  });
};

export default axiosGetter;
