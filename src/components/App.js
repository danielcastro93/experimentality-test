import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Navbar from './Navbar';
import Video from './Video';
import VideoSelector from './VideoSelector';
import { fetchResource } from '../scripts/apiCalls';

const App = () => {
  const [fetchingVideos, setFetchingVideos] = useState(false);
  const [videos, setVideos] = useState();
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [fetchingSelectedVideo, setFetchingSelectedVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();

  const fetchVideos = (query) => {
    if (!query) {
      setVideos(null);
      setSelectedVideoId(null);
      setSelectedVideo(null);

      return;
    }

    fetchResource(
      'videos',
      {
        q: query,
        fields: ['id/videoId', 'snippet/title', 'snippet/thumbnails']
      },
      setFetchingVideos,
      setVideos,
      (response) => response.items.reduce((videos, { id: { videoId }, snippet: { thumbnails } }) => {
        videos.push({
          id: videoId,
          thumbnails,
        });

        return videos;
      }, []),
      (videos) => setSelectedVideoId(videos[0].id)
    );
  }

  useEffect(() => {
    if (!selectedVideoId) return;

    fetchResource(
      'selectedVideo',
      {
        id: selectedVideoId,
        fields: ['snippet/title', 'snippet/description']
      },
      setFetchingSelectedVideo,
      setSelectedVideo,
      ({ items }) => ({ ...items[0].snippet })
    );
  }, [selectedVideoId]);

  return (
    <>
      <Navbar handleSearchValueChange={fetchVideos} />

      {(fetchingVideos || fetchingSelectedVideo) && (
        <LinearProgress aria-label="Progress bar" />
      )}
      
      {videos && videos.length > 0 && (
        <>
          <VideoSelector videos={videos} selectedVideoId={selectedVideoId} setSelectedVideoId={setSelectedVideoId} />

          {selectedVideo && (
            <Video id={selectedVideoId} {...selectedVideo} />
          )}
        </>
      )}
    </>
  );
};

export default App;
