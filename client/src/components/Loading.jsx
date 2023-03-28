import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
const Loading = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress className="mt-2" />
    </Box>
  );
};

export default Loading;
