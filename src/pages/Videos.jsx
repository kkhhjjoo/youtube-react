import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';

async function fetchVideos(keyword) {
  const url = keyword ? `/videos/search.json` : `/videos/popular.json`;
  const response = await fetch(url);
  const data = await response.json();
  // Normalize id for search.json (id.videoId) and popular.json (id)
  return data.items.map((item) => ({
    ...item,
    id: item.id.videoId ? item.id.videoId : item.id,
  }));
}

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => fetchVideos(keyword),
    staleTime: 1000 * 60 * 1,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
