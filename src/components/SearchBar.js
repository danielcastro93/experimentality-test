import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBack from '@material-ui/icons/ArrowBack';
import InputBase from "@material-ui/core/InputBase";
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  baseBar: {
    width: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'white',
    transition: theme.transitions.create('width'),
  },
  openBar: {
    width: '100%',
  },
  input: {
    flex: 1,
    '& > input': {
      padding: 0,
    },
  },
  button: {
    margin: theme.spacing(0, 3),
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 2),
    },
  },
}));

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const classes = useStyles();

  return (
    <>
      <IconButton color="inherit" aria-label="Open search bar" onClick={() => setOpen(true)}>
        <SearchIcon />
      </IconButton>

      <Toolbar className={open ? classNames(classes.baseBar, classes.openBar) : classes.baseBar} disableGutters>
        <IconButton className={classes.button} color="primary" aria-label="Close search bar" onClick={() => setOpen(false)}>
          <ArrowBack />
        </IconButton>

        <InputBase className={classes.input} placeholder="Search" value={value} onChange={({ target: { value } }) => setValue(value)} />

        {value && (
          <IconButton className={classes.button} color="primary" aria-label="Remove search value" onClick={() => setValue('')}>
            <Close />
          </IconButton>
        )}
      </Toolbar>
    </>
  );
};

export default SearchBar;
