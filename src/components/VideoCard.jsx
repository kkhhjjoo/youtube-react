import React from 'react';
import { formatAgo } from '../util/date';
import { useNavigate } from 'react-router-dom';


export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();

  return (
    <li onClick={()=>{navigate(`/videos/watch/${video.id}`, {state: {video}})
    }}
    className='bg-zinc-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform'>
      <img
        src={thumbnails.medium.url}
        alt={title}
        className='w-full aspect-video object-cover'
      />
      <div className='p-4'>
        <p className='font-semibold text-lg my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
