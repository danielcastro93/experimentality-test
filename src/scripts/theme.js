import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#1abc9c',
    },
    secondary: {
      main: '#a1cb00'
    },
    grey: {
      main: '#333333',
    },
  },
  typography: {
    fontFamily: "'Comfortaa', cursive",
  },
  breakpoints: {
    values: {
      sm: 768,
    },
  },
});