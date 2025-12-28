'use client';

import Heading from '@atlaskit/heading';
import { Box, Inline, Stack, Text } from '@atlaskit/primitives';
import EmptyState from '@atlaskit/empty-state';
import { Episode } from '@/types/tvmaze';
import { EpisodeCard } from '@/components/EpisodeCard';
import { STRINGS } from '@/constants/strings';

export const EpisodeList = ({ episodes, searchQuery }: { episodes: Episode[]; searchQuery?: string }) => {
  if (!episodes.length) {
    return (
      <Box
        backgroundColor="elevation.surface"
        padding="space.400"
        style={{
          borderRadius: '3px',
          border: '1px solid var(--ds-border)',
        }}
      >
        <EmptyState
          header={searchQuery ? 
            'No results found' : 'No episodes'}
          description={
            searchQuery
              ? STRINGS.episodes.noResults(searchQuery)
              : STRINGS.episodes.noEpisodes
          }
        />
      </Box>
    );
  }

  return (
    <section aria-label={STRINGS.episodes.title}>
      <Stack space="space.200">
        <Inline alignBlock="center" spread="space-between">
          <Inline space="space.100" alignBlock="center">
            <Heading size="medium" as="h2">
              {STRINGS.episodes.title}
            </Heading>
            <Text size="small" color="color.text.subtlest">
              ({episodes.length})
            </Text>
          </Inline>
        </Inline>
        <div className="episode-grid" role="list">
          {episodes.map((episode) => (
            <div key={episode.id} role="listitem">
              <EpisodeCard episode={episode} />
            </div>
          ))}
        </div>
      </Stack>
    </section>
  );
};
