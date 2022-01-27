import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
} from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import React, { createContext, ReactNode, useMemo, useState } from "react";
import { ImmortalColorsGetter } from "./pallette";
import BinaryBg from "../../assets/images/binaryBg.png";
import ThreeRed from "../../assets/buttons/threeRed.png";
import ThreeWhite from "../../assets/buttons/threeWhite.png";
import ThreeRedAlt from "../../assets/buttons/threeRedAlt.png";
import ThreeWhiteAlt from "../../assets/buttons/threeWhiteAlt.png";

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
  }
}

let ImmortalMuITheme = createTheme({
  typography: {
    fontFamily:
      "Futura, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
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
                color: "#fff",
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
                color: theme.palette.error.main,
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
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily:
              "Futura, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0B0E10",
          },
          html: {
            height: "100%",
          },
          "& #root": {
            width: "1440px",
            maxWidth: "100%",
            margin: "0 auto",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            background: `url('${BinaryBg}') ,#0B0E10`,
            backgroundPosition: "center top",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat",
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
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.secondary.main,
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
