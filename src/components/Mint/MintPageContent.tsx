import { Box, Grid } from "@mui/material";
import useMobile from "../../hooks/useMobile";
import { FONTS } from "../../lib/theme";
import HeroImageBox from "../Reusable/HeroImageBox";
import MarkdownParser from "../Reusable/MarkdownParser";
import PageHeader from "../Reusable/PageHeader";
import MintBox from "./MintBox";
import MintHeader from "./MintHeader";
import SolPerNftBox from "./SolPerNftBox";
import SupplyBox from "./SupplyBox";
import arrowBg from "../../assets/images/mint/arrowsBg.png";
import { useContext } from "react";
import {
  whitelistTokenPublicKey,
  presaleTokenPublicKey,
  WalletContext,
} from "../../providers/AuthProviderButtons";
import { StrapiContext } from "../../providers/StrapiPublicProvider";

export type MintPageContentPropsType = { pageHeader: any; pageDesc: string };

const MintPageContent: React.VFC<MintPageContentPropsType> = ({
  pageHeader,
  pageDesc,
}) => {
  const { seasonsEnabled } = useContext(StrapiContext);
  const { onMint } = useContext(WalletContext);
  const Mobile = useMobile();

  const { presaleEnabled, whitelistEnabled, publicEnabled } =
    seasonsEnabled || {};

  const mintFunction = async (type: "presale" | "whitelist" | "public") => {
    switch (type) {
      case "presale":
        if (presaleEnabled && onMint) {
          return await onMint(presaleTokenPublicKey);
        }
        break;
      case "whitelist":
        if (whitelistEnabled && onMint) {
          return await onMint(whitelistTokenPublicKey);
        }
        break;
      case "public":
        if (publicEnabled && onMint) {
          return await onMint(null);
        }
        break;
      default:
        break;
    }
  };

  console.log(seasonsEnabled);

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justfyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          px: Mobile ? 0 : 16,
          pb: Mobile ? 5 : 10,
          background: !Mobile ? `url('${arrowBg}')` : "none",
          backgroundSize: "98% calc(100% - 20px)",
          backgroundPosition: "center calc(100% - -2px)",
          backgroundRepeat: "no-repeat",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            width: "1280px",
            maxWidth: "100%",
          }}
        >
          <MintHeader />
          <Box sx={{ px: 2 }}>
            <Grid
              container
              columnSpacing={Mobile ? 0 : 6}
              rowSpacing={Mobile ? 3 : 0}
            >
              <Grid item xs={12} lg={6}>
                <PageHeader
                  {...pageHeader}
                  sx={{ textAlign: "left", py: 3 }}
                  smaller
                />
                {pageDesc && (
                  <Box
                    sx={{
                      fontFamily: FONTS.SOURCE,
                      color: "primary.light",
                    }}
                  >
                    <MarkdownParser>{pageDesc}</MarkdownParser>
                  </Box>
                )}

                <Grid container spacing={4} sx={{ mt: 2 }}>
                  {/* <Grid item xs={12} md={6}>
                    <MintBox
                      onClick={async () => await mintFunction("presale")}
                      type={"PRESALE"}
                      disabled={!presaleEnabled}
                      progress={presaleEnabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MintBox
                      onClick={async () => await mintFunction("whitelist")}
                      type={"WHITELIST"}
                      disabled={!whitelistEnabled}
                      progress={whitelistEnabled}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <MintBox
                      onClick={async () => await mintFunction("public")}
                      type={"PUBLIC MINT"}
                      disabled={!publicEnabled}
                      progress={publicEnabled}
                    />
                  </Grid>
                </Grid>

                <SolPerNftBox />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box sx={{ pt: [0, 0, 6], mb: [8, 8, 0] }}>
                  <HeroImageBox />
                  <SupplyBox sx={{ mt: 3 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MintPageContent;
