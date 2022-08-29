import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import Videos from './Videos.component';
import { fetchData } from '../utils/fetchData';
import { useParams } from 'react-router-dom';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      const { items } = await fetchData(`search?part=snippet&q=${searchTerm}`);
      setVideos(items);
    }
    fetchVideos();
  }, [searchTerm])

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        mb='2'
        sx={{
          color: 'white'
        }}
      >
        Search Results For: <span style={{ color: '#f31503' }}>{searchTerm}</span> Videos
      </Typography>

      <Videos videos={videos} />

    </Box>
  )
}

export default SearchFeed