import React from 'react';
import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard.component';
import Loader from './Loader.component';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <Loader />;
  return (
    <Stack
      direction={direction || 'row'}
      flexWrap='wrap'
      justifyContent='center'
      alignItems='center'
      gap={2}
    >
      {
        videos.map((video, idx) => (
          <Box
            key={idx}
          >
            {
              video.id.videoId && <VideoCard video={video} />
            }
          </Box>
        ))
      }
    </Stack>
  )
}

export default Videos