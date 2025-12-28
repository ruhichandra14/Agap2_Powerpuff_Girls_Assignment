'use client';

import Link from 'next/link';
import Button from '@atlaskit/button/new';
import { Box, Stack } from '@atlaskit/primitives';
import EmptyState from '@atlaskit/empty-state';
import ArrowLeftIcon from '@atlaskit/icon/core/arrow-left';
import { STRINGS } from '@/constants/strings';

const EpisodeNotFound = () => (
  <Box padding="space.600">
    <Stack space="space.300" alignInline="center">
      <EmptyState
        header={STRINGS.errors.episodeNotFound}
        description={STRINGS.errors.episodeNotFoundDesc}
      />
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Button iconBefore={ArrowLeftIcon}>
          {STRINGS.navigation.backToEpisodes}
        </Button>
      </Link>
    </Stack>
  </Box>
);

export default EpisodeNotFound;
