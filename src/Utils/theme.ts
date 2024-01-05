import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#391E5A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D8D2DE",
      contrastText: "#fff",
    },
    error: {
      light: "#FF6166",
      main: "#FF4C51",
      dark: "#E04347",
      contrastText: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 500,
      letterSpacing: "-1.5px",
      color: "rgba(0, 0, 0, 0.87)",
    },
    h4: {
      fontWeight: 500,
      letterSpacing: "0.25px",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    h6: {
      letterSpacing: "0.15px",
    },
    subtitle1: {
      letterSpacing: "0.15px",
    },
    subtitle2: {
      letterSpacing: "0.1px",
    },
  },
});

theme = responsiveFontSizes(theme);
