import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
  height?: string
}

const Loader: React.FC<Props> = ({ height = '260px' }) => {
  console.log("🚀 ~ height:", height)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        minHeight: '260px',
        height: height || '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a0a'
      }}>
      <CircularProgress sx={{ color: '#00dc3e' }} size={80} />
    </Box>
  );
}

export { Loader };