import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  TableBody,
  Grid,
  Button,
} from "@mui/material";
import NavigationHeader from "../../../../assets/sections/homepage/navigationHeader.png";
import { useAppSelector } from "src/app/hooks";
import { FONTS } from "src/lib/theme";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useWalletModal,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

export type WalletBoxPropsType = {};

const WalletBox: React.VFC<WalletBoxPropsType> = () => {
  const { wallet } = useWallet();
  const { tokens } = useAppSelector((state) => state.user);

  const { setVisible: setWalletModalVisible } = useWalletModal();
  const triggerWalletModal = () => {
    setWalletModalVisible(true);
  };

  // *************** RENDER *************** //
  return (
    <Card
      sx={{
        background: "none",
      }}
    >
      <CardHeader
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                px: 2,
                fontFamily: "Furore",
                fontSize: "0.8rem",
                color: "primary.main",
              }}
            >
              Wallet
            </Typography>
            <Typography sx={{ color: "error.main", fontSize: "0.65rem" }}>
              {wallet && "LOGGED IN"}
            </Typography>
          </Box>
        }
        sx={{
          background: `url('${NavigationHeader}')`,
          backgroundSize: "100% 100%",
          border: 0,
          pr: 4,
        }}
      />
      <CardContent
        sx={{
          borderColor: "primary.main",
          borderWidth: 1,
          borderStyle: "solid",
          borderTop: "none",
          backgroundColor: `primary.dark`,
        }}
      >
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <Grid container sx={{ fontFamily: FONTS.FURORE }}>
                    <Grid item xs={6}>
                      <Box sx={{ color: "primary.light", fontSize: "1.1rem" }}>
                        NFTs
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ fontSize: "1.1rem", textAlign: "right" }}
                    >
                      <Box sx={{ color: "primary.main" }}>
                        {tokens.length ?? 0}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ fontSize: "0.85rem", color: "error.main" }}>
                        STAKED
                      </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Box sx={{ fontSize: "0.85rem", color: "error.main" }}>
                        0
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ fontSize: "0.85rem", color: "primary.main" }}>
                        UNSTAKED
                      </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Box sx={{ fontSize: "0.85rem", color: "primary.main" }}>
                        0
                      </Box>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>DTAC</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <Typography color="primary">3500.00</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>SOL</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <Typography color="primary">3.5</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {!wallet && (
          <Button
            variant="contained"
            color="primary"
            onClick={triggerWalletModal}
            fullWidth
          >
            Connect Wallet
          </Button>
        )}
        {wallet && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <WalletDisconnectButton
              className=" logoutButton "
              startIcon={undefined}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletBox;
