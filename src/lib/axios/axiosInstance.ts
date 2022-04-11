import { store } from "app/store";
import axios from "axios";
import { newSnackbar } from "features/global/globalSlice";
import {
  setCanWidthdawSolana,
  setDepositedSolanaBalance,
  setSolanaMaxWidthdrawAmount,
} from "features/user/userSlice";

const axiosInstance = axios.create({
  timeout: 120000,
});

axiosInstance.interceptors.response.use(
  function (response: any) {
    // setter for deposited balance
    const solanaDepositedInResponse =
      response.solGameBalance ??
      response.data?.solGameBalance ??
      response.userGameBalance ??
      response.data?.userGameBalance ??
      null;
    if (solanaDepositedInResponse !== null) {
      store.dispatch(setDepositedSolanaBalance(solanaDepositedInResponse));
    }

    // setter for can widthdraw boolean
    const canWidthdrawSolanaInRespose =
      response.canWithdraw ?? response.data.canWithdraw ?? null;
    if (canWidthdrawSolanaInRespose) {
      store.dispatch(setCanWidthdawSolana(canWidthdrawSolanaInRespose));
    }

    // setter for max widthdraw amount
    const maxWidthdrawSolanaAInResponse =
      response.maxWithdrawAmount ?? response.data.maxWithdrawAmount ?? null;
    if (maxWidthdrawSolanaAInResponse) {
      store.dispatch(
        setSolanaMaxWidthdrawAmount(maxWidthdrawSolanaAInResponse)
      );
    }

    // bind message to snackbar
    const { message } = response;
    if (message) {
      store.dispatch(
        newSnackbar({
          id: `ApiCall${Math.random()}`,
          content: message,
          variant: "info",
        })
      );
    }
    // ends here
    return response;
  },
  function (error) {
    // bind for error message snackbar
    const errorMessage = error.response?.data?.message;
    if (errorMessage) {
      store.dispatch(
        newSnackbar({
          id: `ApiCall${Math.random()}`,
          content: errorMessage,
          variant: "error",
        })
      );
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
