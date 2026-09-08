import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router';

function RootLayout() {
  const matches = useMatches();

  useEffect(() => {
    const last = matches.at(-1);
    document.title = last?.handle?.title || 'Campus Board';
  }, [matches]);

  return (
    <Box minH="100dvh">
      <Outlet />
    </Box>
  );
}

export default RootLayout;
