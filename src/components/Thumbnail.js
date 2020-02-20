import React from 'react';
import classNames from 'classnames';
import { makeStyles, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexShrink: 0,
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  image: {
    width: 120,
  },
  overlay: {
    backgroundColor: fade(theme.palette.grey.main, 0.7),
  },
  icon: {
    margin: 'auto',
  },
  centered: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  selected: {
    border: `${theme.spacing(0.5)}px solid ${theme.palette.primary.main}`,
  }
}));

const Thumbnail = ({ title, thumbnails: { default: { url } }, selected, onClick }) => {
  const classes = useStyles();

  return (
    <Paper className={classNames(classes.root, selected && classes.selected)} onClick={onClick}>
      <img className={classes.image} src={url} alt={title} />
      <div className={classNames(classes.overlay, classes.centered)} />
      <PlayArrowIcon className={classNames(classes.icon, classes.centered)} color="primary" fontSize="large" />
    </Paper>
  );
};

export default Thumbnail;