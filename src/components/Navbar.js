import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginRight: theme.spacing(3),
    width: theme.spacing(5),
    height: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
    },
  },
  title: {
    flex: 1,
  },
}));

const App = ({ handleSearchValueChange }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <img className={classes.logo} src="/logo.png" alt="Experimentality Logo" />

        <Typography className={classes.title} variant="h6">
          Experimentality
        </Typography>

        <SearchBar onChange={handleSearchValueChange} />
      </Toolbar>
    </AppBar>
  );
};

export default App;
