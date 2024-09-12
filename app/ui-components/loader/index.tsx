import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { appConfig } from '@/lib/bubbles.utils';

const { height } = appConfig

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: `${height}px`, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress sx={{ color: '#00dc3e' }} size={80} />
    </Box>
  );
}

export { Loader };