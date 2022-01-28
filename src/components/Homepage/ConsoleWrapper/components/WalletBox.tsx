import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Button,
  TableBody,
} from "@mui/material";
import NavigationHeader from "../../../../assets/sections/homepage/navigationHeader.png";
import { IWalletEntry } from "../ConsoleWrapper";

export type WalletBoxPropsType = {
  walletData?: IWalletEntry[];
};

const WalletBox: React.VFC<WalletBoxPropsType> = ({ walletData }) => {
  if (!walletData || walletData.length === 0) return null;
  // *************** RENDER *************** //
  return (
    <Card
      sx={{
        background: "none",
      }}
    >
      <CardHeader
        title={
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
        }
        sx={{
          background: `url('${NavigationHeader}')`,
          backgroundSize: "100% 100%",
          border: 0,
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
              {walletData.map((entry) => {
                return (
                  <TableRow
                    key={entry.name}
                    sx={{
                      td: {
                        textShadow: "1px 1px 1px rgba(255,255,255,0.35)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ color: "primary.light", fontFamily: "Furore" }}
                    >
                      {entry.name}
                    </TableCell>
                    <TableCell
                      sx={{ color: "primary.main", fontFamily: "Furore" }}
                    >
                      {entry.value}
                    </TableCell>
                    <TableCell
                      sx={{ color: "primary.light", fontFamily: "Furore" }}
                    >
                      {entry.currency}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" sx={{ pt: 2 }}>
          <Box sx={{ p: 1.5, width: "100%" }}>
            <Button fullWidth variant="threeButtonAlt" color="primary">
              MINT NOW
            </Button>
          </Box>
          <Box sx={{ p: 1.5, width: "100%" }}>
            <Button fullWidth variant="threeButtonAlt" color="secondary">
              WHITE PAPER
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WalletBox;
