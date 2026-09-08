import { Outlet } from 'react-router';
import { useProjects } from '@/features/projects/';
import PageRenderer from '@/components/PageRenderer';
import { Grid, GridItem } from '@chakra-ui/react';
import Sidebar from '@//components/Sidebar';
import { useEffect } from 'react';

function AppLayout() {
  const { projects, loading, error, fetchMyProjects } = useProjects();

  useEffect(() => {
    fetchMyProjects();
  }, [fetchMyProjects]);

  return (
    <Grid
      maxH="100dvh"
      h="100dvh"
      templateColumns={{
        base: '1fr',
        md: '240px 1fr',
      }}
    >
      <GridItem>
        <PageRenderer loading={loading} error={error}>
          <Sidebar projects={projects} />
        </PageRenderer>
      </GridItem>
      <GridItem>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default AppLayout;
