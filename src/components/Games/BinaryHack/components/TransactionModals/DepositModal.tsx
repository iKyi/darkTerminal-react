import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import TerminalModalWrapper from "components/Reusable/TerminalModalWrapper";
import { setDepositModal } from "features/global/globalSlice";
import useDepositWithdraw from "hooks/useDepositWithdraw";
import { flexBetween } from "lib/sxUtils";
import parseWalletValue from "utils/parseWalletValue";
import solanaIcon from "assets/icons/solIcon.png";

export type DepositModalPropsType = {};

const DepositModal: React.VFC<DepositModalPropsType> = () => {
  const wallet = useWallet();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.global.depositModal);
  const { solanaBalance } = useAppSelector((state) => state.user);
  const { doDeposit } = useDepositWithdraw();

  const [depositValue, setDepositValue] = useState<number>(0);

  const inputNumberProcess = (value: string) => {
    let workingValue = Number(value);
    const maxValue = solanaBalance ?? 0;
    if (workingValue > maxValue) {
      workingValue = maxValue;
    }
    setDepositValue(workingValue);
    if (inputRef.current) {
      inputRef.current.value = workingValue.toString();
    }
  };

  const closeDepositModal = () => {
    setDepositValue(0);
    dispatch(setDepositModal(false));
  };

  const submitDisabled = useMemo(() => {
    return (
      depositValue === 0 ||
      (solanaBalance && depositValue > solanaBalance) ||
      !solanaBalance
    );
  }, [solanaBalance, depositValue]);

  const doDepositAction = () => {
    doDeposit(depositValue).then(() => {
      closeDepositModal();
    });
  };

  // *************** RENDER *************** //
  return (
    <TerminalModalWrapper open={open} bigTitle="DEPOSIT">
      <Box sx={{ p: 4 }}>
        <Stack spacing={2.5}>
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

          <Box sx={{ ...flexBetween, pt: 6, alignItems: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={closeDepositModal}
              size="small"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={submitDisabled}
              onClick={doDepositAction}
            >
              DEPOSIT
            </Button>
          </Box>
        </Stack>
      </Box>
    </TerminalModalWrapper>
  );
};

export default DepositModal;
