import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#56B7BA",
      contrastText: "#fff",
    },
    secondary: {
      main: "#03142F",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
  },
    fontFamily: "Poppins, sans-serif",
    h4: {
        fontWeight: 600
    },
  },
});
