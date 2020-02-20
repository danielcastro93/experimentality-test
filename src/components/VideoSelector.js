import React, { useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3, 0),
    },
  },
  container: {
    marginBottom: -17,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflowX: 'scroll',
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        marginRight: theme.spacing(3),
      },
    },
  },
}));

const VideoSelector = ({ videos, selectedVideoId, setSelectedVideoId }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const scroll = (orientation = 'backwards') => () => {
    const offset = 125;
    const scrollLeft = containerRef.current.scrollLeft;

    containerRef.current.scrollTo({
      left: orientation === 'forward' ? scrollLeft + offset : scrollLeft - offset,
      behavior: 'smooth'
    });
  };

  console.log(videos);
  return (
    <div className={classes.root}>
      {isMobile && (
        <IconButton color="primary" onClick={scroll()} disableRipple disableFocusRipple disableTouchRipple>
          <ChevronLeftIcon />
        </IconButton>
      )}

      <div id="container" className={classes.container} ref={containerRef}>
        {videos.map(({ id, ...videoProps }) => (
          <Thumbnail
            {...videoProps}
            selected={selectedVideoId === id}
            onClick={() => setSelectedVideoId(id)}
            key={id}
          />
        ))}
      </div>

      {isMobile && (
        <IconButton color="primary" onClick={scroll('forward')} disableRipple disableFocusRipple disableTouchRipple>
          <ChevronRightIcon />
        </IconButton>
      )}
    </div>
  );
};

export default VideoSelector;