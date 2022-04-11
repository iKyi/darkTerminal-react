const getApiBase = () => {
  // return !process.env.REACT_APP_RPC_URL?.includes("ssc-dao")
  //   ? "https://api-dt-api-dt-dev.azurewebsites.net/api/"
  //   : "https://api-dt.azurewebsites.net/api/";
  return process.env.REACT_APP_API_URL;
};

export default getApiBase;
