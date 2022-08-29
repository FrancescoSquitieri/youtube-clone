import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { fetchData } from '../utils/fetchData';
import Videos from './Videos.component';
import Loader from './Loader.component';

const VideoDetail = () => {

  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [videoDetail, setVideoDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      const { items } = await fetchData(`videos?part=snippet,statistics&id=${id}`);
      setVideoDetail(items[0]);

    }
    const fetchRecommendedVideos = async () => {
      const { items } = await fetchData(`search?part=snippet&relatedToVideoId=${id}&type=video`);
      setRecommendedVideos(items);
    }
    fetchVideo();
    fetchRecommendedVideos();
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack
        direction={{
          xs: 'column',
          md: 'row'
        }}
      >
        <Box flex={1}>
          <Box
            sx={{
              width: '100%',
              position: 'sticky',
              top: '86px'
            }}
          >
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{
                color: '#fff'
              }}
              py={1}
              px={2}
            >
              <Link to={`channel/${channelId}`}>
                <Typography variant='h6' color='#fff'>
                  {channelTitle}
                  <CheckCircle
                    sx={{
                      fontSize: '12px',
                      color: 'gray',
                      ml: '5px'
                    }}
                  />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography
                  variant='body1'
                  sx={{
                    opacity: 0.7
                  }}
                >
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    opacity: 0.7
                  }}
                >
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={recommendedVideos} direction="column" />
        </Box>
      </Stack>


    </Box>
  )
}

export default VideoDetail