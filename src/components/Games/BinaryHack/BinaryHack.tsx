import { Box, Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import TitleElement from "./components/TopWrapper/TitleElement";
import TopWrapper from "./components/TopWrapper/TopWrapper";
import { Link as RouterLink } from "react-router-dom";
import BinaryHackNowButton from "./components/TopWrapper/BinaryHackNowButton";
import LoginBox from "./components/TopWrapper/LoginBox";
import EventsBox from "./components/EventsBox/EventsBox";
import StrapiPublicProvider from "providers/StrapiPublicProvider";
import WalletBox from "./components/BinaryHeader/WalletBox";
import withdrawIcon from "assets/images/binary/icons/withdrawIcon.png";
import depositIcon from "assets/images/binary/icons/depositIcon.png";
import { useAppDispatch, useAppSelector } from "app/hooks";
import parseWalletValue from "utils/parseWalletValue";
import {
  setDepositModal,
  setInfoModal,
  setWithdrawModal,
} from "features/global/globalSlice";
import MidNumbersRegion from "./components/MidNumbersRegion";
import useBinaryState from "hooks/useBinaryState";
import Header from "components/Reusable/Layout/Header/Header";

const AllGamesButton: React.FC = () => {
  return (
    <Button component={RouterLink} to="/">
      ALL GAMES
    </Button>
  );
};

export type BinaryHackPropsType = {};

const BinaryHack: React.VFC<BinaryHackPropsType> = () => {
  const wallet = useWallet();
  const { solanaBalance, depositedSolanaBalance, canWidthdrawSolana } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { refreshBalance } = useBinaryState();

  const { connected } = wallet;
  useEffect(() => {
    refreshBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  const openDepositModal = () => {
    dispatch(setDepositModal(true));
  };

  const openWithdrawModal = () => {
    if (!canWidthdrawSolana) {
      dispatch(setInfoModal("You cannot currently withdraw more ..."));
    } else {
      dispatch(setWithdrawModal(true));
    }
  };

  // *************** RENDER *************** //
  return (
    <StrapiPublicProvider>
      {connected && (
        <Header>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <WalletBox
              buttonText="WITHDRAW"
              currency="SOL"
              icon={<img src={withdrawIcon} alt="withdraw icon" />}
              title="DEPOSITED BALANCE"
              value={depositedSolanaBalance}
              onClick={openWithdrawModal}
            />
            <WalletBox
              buttonText="DEPOSIT"
              currency="SOL"
              icon={<img src={depositIcon} alt="withdraw icon" />}
              title="WALLET BALANCE"
              value={parseWalletValue(wallet, solanaBalance)}
              onClick={openDepositModal}
            />
          </Box>
        </Header>
      )}
      <TopWrapper
        sx={{
          mb: 5,
          mt: connected ? 5 : 15,
        }}
        topContent={<TitleElement />}
        bottomContent={
          !connected ? <AllGamesButton /> : <BinaryHackNowButton />
        }
      >
        {connected ? <MidNumbersRegion /> : <LoginBox />}
      </TopWrapper>
      <EventsBox />
    </StrapiPublicProvider>
  );
};

export default BinaryHack;
