import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { appConfig } from '@/lib/bubbles.utils';

type Props = {
  height?: number
}

const Loader: React.FC<Props> = ({ height }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: `${height}px`, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress sx={{ color: '#9CBC72' }} size={80} />
    </Box>
  );
}

export { Loader };