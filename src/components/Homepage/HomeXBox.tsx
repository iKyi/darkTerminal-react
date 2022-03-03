import { Box, Link as MUILink, Button } from "@mui/material";
import GlitchFont from "../Reusable/GlitchFont";
import topLeft from "../../assets/images/homexbox/topLeft.png";
import topRight from "../../assets/images/homexbox/topRight.png";
import bottomLeft from "../../assets/images/homexbox/bottomLeft.png";
import bottomRight from "../../assets/images/homexbox/bottomRight.png";

import topLefti from "../../assets/images/homexbox/topLeftIcon.png";
import topRighti from "../../assets/images/homexbox/topRightIcon.png";
import bottomLefti from "../../assets/images/homexbox/bottomLeftIcon.png";
import bottomRighti from "../../assets/images/homexbox/bottomRightIcon.png";
import overAllBg from "../../assets/images/homexbox/overAllBg.png";
import MarkdownParser from "../Reusable/MarkdownParser";
import HomeVideoBox from "./HomeVideoBox";
import { useNavigate } from "react-router-dom";

export type HomeXBoxButtonActionType =
  | "buyNowNft"
  | "buyNowDTAC"
  | "mintingServices"
  | "play";
interface IBoxData {
  title: string;
  position: string;
  background: any;
  icon: any;
  button: {
    text: string;
    action: HomeXBoxButtonActionType;
    disabled?: boolean;
    url?: string;
  };
}
const mainBoxText: string = `<span class="TW">OPEN UP</span> <span class="TP">YOUR TERMINAL</span>`;
const mainBoxDesc: string = `<span class="TE">GAMES</span> & <span class="TE">MINTING SERVICES</span>`;

const squareBoxes: IBoxData[] = [
  {
    title: "hacking <span class='TP'>GAMES</span>",
    position: "topLeft",
    background: topLeft,
    icon: topLefti,
    button: {
      action: "play",
      text: "PLAY NOW",
    },
  },
  {
    title: "minting <span class='TP'>services</span>",
    position: "topRight",
    background: topRight,
    icon: topRighti,
    button: {
      disabled: true,
      text: "COMING SOON",
      action: "mintingServices",
    },
  },
  {
    title: "25 mil <span class='TP'>dtac</span>",
    position: "bottomLeft",
    background: bottomLeft,
    icon: bottomLefti,
    button: {
      action: "buyNowDTAC",
      text: "BUY NOW",
    },
  },
  {
    title: "nfts <span class='TP'>111</span>",
    position: "bottomRight",
    background: bottomRight,
    icon: bottomRighti,
    button: {
      action: "buyNowNft",
      text: "BUY NOW",
    },
  },
];

export type HomeXBoxPropsType = {};

const HomeXBox: React.VFC<HomeXBoxPropsType> = () => {
  const navigate = useNavigate();
  const buttonAction = (
    action: "buyNowNft" | "buyNowDTAC" | "mintingServices" | "play"
  ) => {
    switch (action) {
      case "play":
        navigate("/#games");
        break;
      case "buyNowDTAC":
        window.open("https://www.google.com/dtac", "_blank");
        break;
      case "buyNowNft":
        window.open("https://www.google.com/nft", "_blank");
        break;
      case "mintingServices":
        window.open("https://www.google.com/nft", "_blank");
        break;
      default:
        break;
    }
  };

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
            p: 6,
            display: "grid",
            rowGap: "0px",
            columnGap: "6px",
            gridTemplateRows: "auto",
            gridTemplateAreas: `
            "title title title title"
            "topLeft bigSpaceTwo bigSpaceTwo topRight" 
            "main main main main" 
            "bottomLeft bigSpace bigSpace bottomRight"
            "footerO whitepaper whitepaper footerU"`,
            background: `url('${overAllBg}')`,
            backgroundSize: "100% 100%",
          },
        })}
      >
        <Box
          className="Titlebox"
          sx={(theme) => ({
            textAlign: "center",
            width: "100%",
            my: 3,
            [theme.breakpoints.up("lg")]: {
              gridArea: "title",
              m: "0 auto",
              pb: 3,
            },
          })}
        >
          <Box
            sx={() => ({
              lineHeight: 1.1,
              mb: 1,
              fontSize: ["1.4rem", "1.4rem", "1.8rem"],
            })}
          >
            <GlitchFont>
              <MarkdownParser>{mainBoxText}</MarkdownParser>
            </GlitchFont>
          </Box>
          <Box
            sx={{
              color: "primary.light",
              textTransform: "uppercase",
            }}
          >
            <MarkdownParser>{mainBoxDesc}</MarkdownParser>
          </Box>
        </Box>
        <Box
          className="videobox"
          sx={(theme) => ({
            textAlign: "center",
            [theme.breakpoints.down("lg")]: {
              width: "100%",
            },
            [theme.breakpoints.up("lg")]: {
              gridArea: "main",
              width: "100%",
              maxWidth: "540px",
              m: "0 auto",
              py: 2,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down("lg")]: {
                margin: "0 auto",
                mb: 4,
              },
            })}
          >
            <HomeVideoBox />
          </Box>
        </Box>
        {squareBoxes.map(({ title, background, button, icon, position }) => {
          return (
            <Box
              key={title}
              sx={(theme) => ({
                margin: "0 auto",
                background: `url('${background}')`,
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
                  gridArea: position,
                },
              })}
            >
              <Box
                sx={{
                  textAlign: "center",
                  lineHeight: 1.01,
                  fontSize: "1.4rem",
                }}
              >
                <MarkdownParser>{title}</MarkdownParser>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="complex"
                    sx={{ mt: "auto", mx: "auto" }}
                    disabled={button.disabled}
                    onClick={() => buttonAction(button.action)}
                  >
                    {button.text}
                  </Button>
                </Box>
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
            color="info"
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
