import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Video from './Video';
import { fetchResource } from '../scripts/apiCalls';

const App = () => {
  const [fetchingVideos, setFetchingVideos] = useState(false);
  const [videos, setVideos] = useState();
  const [selectedVideoId, setSelectedVideoId] = useState('HQmmM_qwG4k');
  const [fetchingSelectedVideo, setFetchingSelectedVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();

  const fetchVideos = (query) => fetchResource(
    'videos',
    {
      q: query,
      fields: ['id/videoId', 'snippet/thumbnails']
    },
    setFetchingVideos,
    setVideos,
    (response) => response,
    (videos) => setSelectedVideoId(videos.items[0].id.videoId)
  );

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

  useEffect(() => {
    if (videos) console.log(videos);
    if (selectedVideo) console.log(selectedVideo);
  }, [videos, selectedVideo]);

  return (
    <>
      <Navbar handleSearchValueChange={fetchVideos} />

      {fetchingVideos && 'Loading videos...'}
      {fetchingSelectedVideo && 'Loading selected video...'}
      {selectedVideo && (
        <Video id={selectedVideoId} {...selectedVideo}/>
      )}
    </>
  );
};

export default App;
