import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
} from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import React, { createContext, ReactNode, useMemo, useState } from "react";
import { ImmortalColorsGetter } from "./pallette";
import ThreeRed from "../../assets/buttons/threeRed.png";
import ThreeWhite from "../../assets/buttons/threeWhite.png";
import ThreeRedAlt from "../../assets/buttons/threeRedAlt.png";
import ThreeWhiteAlt from "../../assets/buttons/threeWhiteAlt.png";
import RedSharp from "../../assets/buttons/red_sharp.png";
import bigAngleGreen from "../../assets/buttons/bigAngleGreen.png";
import complexRed from "../../assets/buttons/complexButtonRed.png";
import complexGreen from "../../assets/buttons/complexButtonGreen.png";
import angledRed from "../../assets/buttons/greenAngled/red.png";
import angledGreen from "../../assets/buttons/greenAngled/green.png";

export enum FONTS {
  FUTURA = "Futura, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  SOURCE = "Source Code Pro, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  FURORE = "Furore, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  GLITCH = "CF Glitch City, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    threeButton: true;
    threeButtonAlt: true;
    redSharp: true;
    bigAngleGreen: true;
    complex: true;
    angled: true;
  }
}

let ImmortalMuITheme = createTheme({
  typography: {
    fontFamily: FONTS.FURORE,
    h1: {
      fontFamily: "Furore",
    },
    h2: {
      fontFamily: "Furore",
    },
    h3: {
      fontFamily: "Furore",
    },
    h4: {
      fontFamily: "Furore",
    },
    h5: {
      fontFamily: "Furore",
    },
    h6: {
      fontFamily: "Furore",
    },
  },
  shape: {
    borderRadius: 0,
  },
});

const getOverRides = (theme: Theme) => {
  const ThemeObj: Partial<ThemeOptions> = {
    components: {
      MuiOutlinedInput: {
        variants: [
          // {
          //   props: {
          //     color: "primary",
          //   },
          //   // style: {
          //   //   background: theme.palette.darkSecondary.secondary,
          //   // },
          // },
        ],
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            button: {
              textShadow: "none",
              fontSize: "1.05rem",
              "&:first-of-type": {
                clipPath:
                  "polygon(1px 1px, calc(0% + 10px) 1px, calc(100% - 2px) 1px, calc(100% - 2px) calc(100% - 1px),calc(0% + 10px) calc(100% - 1px), 1px calc(100% - 10px))",
              },
              clipPath:
                "polygon(1px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 1px), 1px calc(100% - 1px))",
              "&:last-of-type": {
                clipPath:
                  "polygon(2px 1px, calc(100% - 10px) 1px, calc(100% - 1px) calc(0% + 10px), calc(100% - 1px) calc(100% - 10px), calc(100% - 1px) calc(100% - 1px), 2px calc(100% - 1px));",
              },
            },
          },
        },
      },
      MuiChip: {
        variants: [],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "angled", color: "primary" },
            style: {
              paddingTop: theme.spacing(1.5),
              paddingBottom: theme.spacing(1.5),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              fontSize: "1rem",
              fontFamily: FONTS.FURORE,
              textTransform: "uppercase",
              background: `url('${angledGreen}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.common.white,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: "angled", color: "secondary" },
            style: {
              paddingTop: theme.spacing(1.5),
              paddingBottom: theme.spacing(1.5),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              fontSize: "1rem",
              fontFamily: FONTS.FURORE,
              textTransform: "uppercase",
              background: `url('${angledRed}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.common.white,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.error.main,
              },
            },
          },
          {
            props: { variant: "complex", color: "primary" },
            style: {
              minWidth: "120px",
              paddingTop: theme.spacing(1.36),
              paddingBottom: theme.spacing(1.36),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              fontSize: "1rem",
              fontFamily: FONTS.FURORE,
              textTransform: "uppercase",
              background: `url('${complexGreen}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.common.white,
              },
            },
          },
          {
            props: { variant: "complex", color: "secondary" },
            style: {
              minWidth: "120px",
              paddingTop: theme.spacing(1.36),
              paddingBottom: theme.spacing(1.36),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              fontSize: "1rem",
              fontFamily: FONTS.FURORE,
              textTransform: "uppercase",
              background: `url('${complexRed}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.common.white,
              },
            },
          },
          {
            props: { variant: "bigAngleGreen" },
            style: {
              paddingTop: theme.spacing(3.2),
              paddingBottom: theme.spacing(3.2),
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              minWidth: "380px",
              fontSize: "1.2rem",
              fontFamily: FONTS.GLITCH,
              textTransform: "uppercase",
              background: `url('${bigAngleGreen}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.error.main,
              },
            },
          },
          {
            props: { variant: "redSharp" },
            style: {
              paddingLeft: theme.spacing(3.5),
              paddingRight: theme.spacing(3.5),
              fontSize: "0.9rem",
              fontFamily: FONTS.GLITCH,
              textTransform: "uppercase",
              background: `url('${RedSharp}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.common.white,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: "threeButton", color: "primary" },
            style: {
              padding: "0.9rem 0 0.75rem 0",
              fontSize: "1.28rem",
              minHeight: "50px",
              background: `url('${ThreeRed}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: "threeButton", color: "secondary" },
            style: {
              padding: "0.9rem 0 0.75rem 0",
              fontSize: "1.28rem",
              minHeight: "50px",
              background: `url('${ThreeWhite}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: "threeButtonAlt", color: "primary" },
            style: {
              padding: "0.9rem 0 0.75rem 0",
              fontSize: "0.9rem",
              lineHeight: 1.05,
              minHeight: "50px",
              background: `url('${ThreeRedAlt}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: "threeButtonAlt", color: "secondary" },
            style: {
              padding: "0.9rem 0 0.75rem 0",
              fontSize: "0.9rem",
              lineHeight: 1.05,
              minHeight: "50px",
              background: `url('${ThreeWhiteAlt}')`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              color: "#fff",
              "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            },
          },
        ],
        styleOverrides: {
          root: {
            fontFamily: "Furore",
            textShadow: "1px 1px 0px rgba(0,0,0,0.75)",
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(1px)",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: FONTS.FURORE,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0B0E10",
          },
          html: {
            height: "100%",
          },
          "& #root": {
            position: "relative",
            zIndex: 2,
            flex: "1",
            display: "flex",
            flexDirection: "column",
          },
          p: {
            margin: 0,
          },
          ".TP": {
            color: theme.palette.primary.main,
          },
          ".TS": {
            color: theme.palette.secondary.main,
          },
          ".TW": {
            color: theme.palette.common.white,
          },
          h1: {
            fontFamily: "Furore",
          },
          h2: {
            fontFamily: "Furore",
          },
          h3: {
            fontFamily: "Furore",
          },
          h4: {
            fontFamily: "Furore",
          },
          h5: {
            fontFamily: "Furore",
          },
          h6: {
            fontFamily: "Furore",
          },
          "@keyframes hackTextEffect": {
            "0%": {
              color: theme.palette.primary.main,
            },
            "50%": {
              color: theme.palette.error.main,
            },
            "100%": {
              color: theme.palette.primary.main,
            },
          },
          ".wallet-adapter-button-start-icon": {
            lineHeight: 1,
          },
          ".wallet-adapter-button": {
            justifyContent: "center",
            fontFamily: FONTS.FURORE,
            fontWeight: 300,
            color: theme.palette.error.main,
            textAlign: "center",
          },
          ".wallet-adapter-button.loginButtonSmall": {
            background: `url('${RedSharp}')`,
            backgroundSize: "100% 100%",
            height: "24px",
            padding: "0 15px 0px 10px",
          },
          ".wallet-adapter-button.loginButton": {
            background: `url('${complexRed}')`,
            backgroundSize: "100% 100%",
            height: "60px",
            padding: "0 30px",
          },
          ".wallet-adapter-button.logoutButton": {
            background: `url('${RedSharp}')`,
            backgroundSize: "100% 100%",
            fontSize: "0.9rem",
            height: "36px",
          },
          "@keyframes hackEffect": {
            "0%": {
              background: theme.palette.primary.main,
              transform: "scale(0.9) rotate(45deg)",
              boxShadow: `0px 0px 20px 3px ${theme.palette.error.main}`,
            },
            "50%": {
              background: theme.palette.error.main,
              transform: "scale(1.1) rotate(45deg)",
              boxShadow: `0px 0px 20px 3px ${theme.palette.primary.main}`,
            },
            "100%": {
              background: theme.palette.primary.main,
              transform: "scale(0.9) rotate(45deg)",
              boxShadow: `0px 0px 20px 3px ${theme.palette.error.main}`,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: FONTS.FURORE,
            borderColor: theme.palette.secondary.main,
            paddingTop: "6px",
            paddingBottom: "6px",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:last-of-type": {
              td: {
                borderColor: "transparent",
              },
            },
          },
        },
      },
    },
  };
  return ThemeObj;
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const DarkTerminalThemeProvider: React.VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => {
    const palette = ImmortalColorsGetter(mode);
    const themeObj = { ...ImmortalMuITheme, ...palette };
    return createTheme(themeObj, getOverRides(themeObj));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkTerminalThemeProvider;
