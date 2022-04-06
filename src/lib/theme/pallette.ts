import { PaletteMode, ThemeOptions } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? ({
          // palette values for light mode
        } as ThemeOptions["palette"])
      : ({
          // palette values for dark mode
          primary: {
            main: "#36F097",
            contrastText: "#ffffff",
            dark: "#010E08",
            light: "#AEFAD5",
            darker: "#38654F",
          },
          secondary: {
            main: "#194F35",
            contrastText: "rgba(255,255,255,0.87)",
          },
          info: {
            main: "#1e3799",
          },
          success: {
            main: "#78e08f",
          },
          error: {
            main: "#EB1545",
          },
          background: {
            default: "#2A2F41",
            paper: "#434343",
          },
          common: {
            white: "#fff",
            gray: "#777777",
            lightGray: "#C6C6C6",
          },
        } as ThemeOptions["palette"])),
  },
});

export { getDesignTokens as ImmortalColorsGetter };
