import { useWallet } from "@solana/wallet-adapter-react";
import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import TerminalModalWrapper from "components/Reusable/TerminalModalWrapper";
import { setWithdrawModal } from "features/global/globalSlice";
import useDepositWithdraw from "hooks/useDepositWithdraw";
import { flexBetween } from "lib/sxUtils";
import parseWalletValue from "utils/parseWalletValue";
import solanaIcon from "assets/icons/solIcon.png";

export type WithdrawModalPropsType = {};

const WithdrawModal: React.VFC<WithdrawModalPropsType> = () => {
  const [WithdrawValue, setWithdrawValue] = useState<number>(0);
  const wallet = useWallet();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { doWithdraw } = useDepositWithdraw();
  const open = useAppSelector((state) => state.global.withdrawModal);
  const { solanaBalance, depositedSolanaBalance, solanaWidthdrawMaxAmount } =
    useAppSelector((state) => state.user);

  // *************** CONSTANTS *************** //
  const depositedSolanaValue = depositedSolanaBalance ?? 0;
  const upperLimit =
    solanaWidthdrawMaxAmount > depositedSolanaValue
      ? depositedSolanaValue
      : solanaWidthdrawMaxAmount;
  const maxValue = upperLimit ?? 0;

  // *************** METHODS *************** //
  const inputNumberProcess = (value: string) => {
    let workingValue = Number(value);

    if (workingValue > maxValue) {
      workingValue = maxValue;
    }
    setWithdrawValue(workingValue);
    if (inputRef.current) {
      inputRef.current.value = workingValue.toString();
    }
  };

  const closeWithdrawModal = () => {
    setWithdrawValue(0);
    dispatch(setWithdrawModal(false));
  };

  const submitDisabled = useMemo(() => {
    return (
      WithdrawValue === 0 ||
      (depositedSolanaBalance && WithdrawValue > depositedSolanaBalance) ||
      !depositedSolanaBalance
    );
  }, [depositedSolanaBalance, WithdrawValue]);

  const localWithdrawAction = () => {
    doWithdraw(WithdrawValue).then(() => {
      closeWithdrawModal();
    });
  };

  // *************** RENDER *************** //
  return (
    <TerminalModalWrapper open={open} bigTitle="WITHDRAW">
      <Box sx={{ p: 4 }}>
        <Stack spacing={2.5}>
          <Box>
            CURRENT DEPOSITED SOL BALANCE:{" "}
            <Typography color="primary" component="span">
              {parseWalletValue(wallet, depositedSolanaBalance)}
            </Typography>
          </Box>
          <Box>
            CURRENT SOL BALANCE:{" "}
            <Typography color="primary" component="span">
              {parseWalletValue(wallet, solanaBalance)}
            </Typography>
          </Box>
          <FormControl variant="outlined">
            <OutlinedInput
              type="number"
              onChange={(e) => inputNumberProcess(e.target.value)}
              inputRef={inputRef}
              endAdornment={
                <InputAdornment position="end">
                  <img
                    src={solanaIcon}
                    alt="solana icon"
                    style={{ width: "24px" }}
                  />
                </InputAdornment>
              }
            />
          </FormControl>
          <Box>
            MAX WITHDRAW AMOUNT:{" "}
            <Typography color="primary" component="span">
              {maxValue}
            </Typography>
          </Box>
          <Box>
            NEW SOL BALANCE:{" "}
            <Typography color="primary" component="span">
              {WithdrawValue > 0
                ? parseWalletValue(wallet, (solanaBalance ?? 0) + WithdrawValue)
                : "--"}
            </Typography>
          </Box>
          <Box sx={{ ...flexBetween, pt: 6, alignItems: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={closeWithdrawModal}
              size="small"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={submitDisabled}
              onClick={localWithdrawAction}
            >
              WITHDRAW
            </Button>
          </Box>
        </Stack>
      </Box>
    </TerminalModalWrapper>
  );
};

export default WithdrawModal;
