import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 6, 3),
    display: 'flex',
    '& > *': {
      flex: 1,
      '&:first-child': {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
          margin: 0,
        },
      },
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3, 6),
      flexDirection: 'column',
    },
  },
  iframeContainer: {
    height: 400,
  },
  iframe: {
    border: 'none',
    borderRadius: theme.spacing(0.5),
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0),
    },
  },
  description: {
    whiteSpace: 'pre-line',
  },
}));

const Video = ({ id, title, description }) => {
  const classes = useStyles();
  const url = `https://www.youtube.com/embed/${id}`;

  return (
    <div className={classes.root}>
      <Paper className={classes.iframeContainer} elevation={15}>
        <iframe className={classes.iframe} src={url} title={title} />
      </Paper>

      <div>
        <Typography className={classes.title} variant="h6" component="h1">
          {title}
        </Typography>

        <Typography className={classes.description} variant="body2" component="p">
          {description}
        </Typography>
      </div>
    </div>
  );
};

Video.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Video;