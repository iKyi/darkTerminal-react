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
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Brightness1 } from "@mui/icons-material";

export type WalletBoxPropsType = {};

const WalletBox: React.VFC<WalletBoxPropsType> = () => {
  const { wallet } = useWallet();
  const { tokens, datacBalance, solanaBalance } = useAppSelector(
    (state) => state.user
  );

  const { setVisible: setWalletModalVisible } = useWalletModal();
  const triggerWalletModal = () => {
    setWalletModalVisible(true);
  };

  const parseWalletValue = (value: any) => {
    return !wallet ? "-" : value;
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
                pr: 2,
                fontFamily: "Furore",
                fontSize: "0.8rem",
                color: "primary.main",
              }}
            >
              Wallet
            </Typography>
            <Box>
              {wallet && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <WalletMultiButton
                    className=" loginButtonSmall "
                    startIcon={
                      <Box
                        sx={{
                          fontSize: "12px",
                        }}
                      >
                        <Brightness1 fontSize="inherit" color="primary" />
                      </Box>
                    }
                  />
                </Box>
              )}
            </Box>
          </Box>
        }
        sx={{
          background: `url('${NavigationHeader}')`,
          backgroundSize: "100% 100%",
          border: 0,
          p: 2,
          pr: 3,
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
                        {parseWalletValue(tokens.length ?? 0)}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ fontSize: "0.85rem", color: "error.main" }}>
                        STAKED
                      </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Box sx={{ fontSize: "0.85rem", color: "error.main" }}>
                        {parseWalletValue(0)}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ fontSize: "0.85rem", color: "primary.main" }}>
                        UNSTAKED
                      </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Box sx={{ fontSize: "0.85rem", color: "primary.main" }}>
                        {parseWalletValue(tokens.length ?? 0)}
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
                  <Typography color="primary">
                    {parseWalletValue(datacBalance)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>SOL</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  <Typography color="primary">
                    {parseWalletValue(solanaBalance)}
                  </Typography>
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
      </CardContent>
    </Card>
  );
};

export default WalletBox;
