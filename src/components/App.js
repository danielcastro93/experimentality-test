import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { fetchResource } from '../scripts/apiCalls';

const App = () => {
  const [fetchingVideos, setFetchingVideos] = useState(false);
  const [videos, setVideos] = useState();
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [fetchingSelectedVideo, setFetchingSelectedVideo] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();

  const fetchVideos = (query) => fetchResource('videos', setFetchingVideos, setVideos, {
    q: query,
    fields: ['id/videoId', 'snippet/thumbnails']
  }, (videos) => setSelectedVideoId(videos.items[0].id.videoId));

  useEffect(() => {
    if (!selectedVideoId) return;

    fetchResource('selectedVideo', setFetchingSelectedVideo, setSelectedVideo, {
      id: selectedVideoId,
      fields: ['snippet/title', 'snippet/description']
    });
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
    </>
  );
};

export default App;
