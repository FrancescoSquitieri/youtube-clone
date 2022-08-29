import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from './Sidebar.component';
import Videos from './Videos.component';
import { fetchData } from '../utils/fetchData';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { items } = await fetchData(`search?part=snippet&q=${selectedCategory}`);
      setVideos(items);
    }
    fetchVideos();
  }, [selectedCategory])

  return (
    <Stack
      sx={{
        flexDirection: {
          sx: "column",
          md: "row"
        }
      }}
    >
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "92vh"
          },
          borderRight: "1px solid #3d3d3d",
          px: {
            sx: 0,
            md: 2
          }
        }}
      >
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        <Typography
          className='copyright'
          variant='body2'
          sx={{
            mt: 1.5,
            color: "#fff"
          }}
        >
          Copyright 2022 Francesco Squitieri
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography
          variant='h4'
          fontWeight='bold'
          mb='2'
          sx={{
            color: 'white'
          }}
        >
          {selectedCategory} <span style={{ color: '#f31503' }}>Videos</span>
        </Typography>

        <Videos videos={videos} />

      </Box>

    </Stack>
  )
}

export default Feed