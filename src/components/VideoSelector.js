import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Thumbnail from './Thumbnail';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  thumbnail: {
    cursor: 'pointer',
  },
}));

const VideoSelector = ({ videos, selectedVideoId, setSelectedVideoId }) => {
  const classes = useStyles();
  console.log(videos);
  return (
    <div className={classes.root}>
      {videos.map(({ id, ...videoProps }) => (
        <Thumbnail
          {...videoProps}
          selected={selectedVideoId === id}
          onClick={() => setSelectedVideoId(id)}
          key={id}
        />
      ))}
    </div>
  );
};

export default VideoSelector;