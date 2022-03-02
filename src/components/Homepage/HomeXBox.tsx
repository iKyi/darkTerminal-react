import { Box, Typography, Link as MUILink, Button } from "@mui/material";
import GlitchFont from "../Reusable/GlitchFont";
import topLeft from "../../assets/images/homexbox/topLeft.png";
import topRight from "../../assets/images/homexbox/topRight.png";
import bottomLeft from "../../assets/images/homexbox/bottomLeft.png";
import bottomRight from "../../assets/images/homexbox/bottomRight.png";

import topLefti from "../../assets/images/homexbox/topLeftIcon.png";
import topRighti from "../../assets/images/homexbox/topRightIcon.png";
import bottomLefti from "../../assets/images/homexbox/bottomLeftIcon.png";
import bottomRighti from "../../assets/images/homexbox/bottomRightIcon.png";
import { centerFlex } from "src/lib/sxUtils";
import overAllBg from "../../assets/images/homexbox/overAllBg.png";
import MarkdownParser from "../Reusable/MarkdownParser";

interface IBoxData {
  title: string;
  desc: string | number;
  position: string;
  background: any;
  icon: any;
}
const mainBoxText: string = `<span class="TW">OPEN UP</span><br /><span class="TP">YOUR TERMINAL</span>`;
const mainBoxDesc: string = `<span class="TW">DARK</span> <span class="TP">TERMINAL</span> is a platform which hosts multiple hacking themed games >_`;

const squareBoxes: IBoxData[] = [
  {
    desc: "3",
    title: "DT GAMES",
    position: "topLeft",
    background: topLeft,
    icon: topLefti,
  },
  {
    title: "Royalties",
    desc: "30%",
    position: "topRight",
    background: topRight,
    icon: topRighti,
  },
  {
    title: "COIN",
    desc: "DTAC",
    position: "bottomLeft",
    background: bottomLeft,
    icon: bottomLefti,
  },
  {
    title: "DT NFTS",
    desc: 3,
    position: "bottomRight",
    background: bottomRight,
    icon: bottomRighti,
  },
];

export type HomeXBoxPropsType = {};

const HomeXBox: React.VFC<HomeXBoxPropsType> = () => {
  // *************** RENDER *************** //
  return (
    <Box sx={{ my: [3, 3, 6] }}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("lg")]: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          },
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
          },
          [theme.breakpoints.up("lg")]: {
            p: 10,
            display: "grid",
            rowGap: "30px",
            columnGap: "30px",
            gridTemplateRows: "auto",
            gridTemplateAreas: `"topLeft o o topRight" "s main main b" "bottomLeft whitepaper whitepaper bottomRight"`,
            background: `url('${overAllBg}')`,
            backgroundSize: "100% 100%",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            textAlign: "center",
            [theme.breakpoints.down("lg")]: {
              width: "100%",
            },
            [theme.breakpoints.up("lg")]: {
              gridArea: "main",
              maxWidth: "450px",
              m: "0 auto",
              p: 4,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down("lg")]: {
                maxWidth: "360px",
                margin: "0 auto",
                mb: 4,
              },
            })}
          >
            <Box
              sx={() => ({
                lineHeight: 1.1,
                mb: 2,
                fontSize: ["1.8rem", "1.8rem", "2.2rem"],
              })}
            >
              <GlitchFont>
                <MarkdownParser>{mainBoxText}</MarkdownParser>
              </GlitchFont>
            </Box>
            <Box sx={{ color: "primary.light", textTransform: "uppercase" }}>
              <MarkdownParser>{mainBoxDesc}</MarkdownParser>
            </Box>
          </Box>
        </Box>
        {squareBoxes.map((item) => {
          return (
            <Box
              key={item.title}
              sx={(theme) => ({
                maxWidth: "230px",
                margin: "0 auto",
                background: `url('${item.background}')`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                p: 4.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 170,
                [theme.breakpoints.down("lg")]: {
                  m: 3,
                },
                [theme.breakpoints.up("lg")]: {
                  gridArea: item.position,
                },
              })}
            >
              <Box sx={{ ...centerFlex, mr: 2 }}>
                <img src={item.icon} alt={`icon for item ${item.title}`} />
              </Box>
              <Box sx={{ textAlign: "right", lineHeight: 1.01 }}>
                <Typography sx={{ lineHeight: "inherit", fontSize: "1rem" }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "inherit",
                    fontSize: "1.8rem",
                    color: "primary.main",
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <Box
          sx={(theme) => ({
            gridArea: "whitepaper",
            display: "flex",
            jutifyContent: "center",
            textAlign: "center",
            [theme.breakpoints.down("lg")]: {
              width: "100%",
            },
          })}
        >
          <Button
            variant="complex"
            sx={{ mt: "auto", mx: "auto" }}
            component={MUILink}
            href="https://darkterminal.io/darkterminal_whitepaper_v0.4.pdf"
            target="_blank"
            rel="noopener"
          >
            Whitepaper
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeXBox;
