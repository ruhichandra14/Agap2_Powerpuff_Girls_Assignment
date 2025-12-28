'use client';

import Link from 'next/link';
import Image from 'next/image';
import Lozenge from '@atlaskit/lozenge';
import Heading from '@atlaskit/heading';
import { Box, Stack, Text } from '@atlaskit/primitives';
import { Episode } from '@/types/tvmaze';
import { STRINGS } from '@/constants/strings';

export const EpisodeCard = ({ episode }: { episode: Episode }) => {
  const label = episode.number ? `E${episode.number}` : STRINGS.episodes.special;

  return (
    <Link
      href={`/episode/${episode.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      aria-label={`View ${episode.name}`}
    >
      <Box
        backgroundColor="elevation.surface"
        padding="space.0"
        style={{
          borderRadius: '3px',
          border: '1px solid var(--ds-border)',
          overflow: 'hidden',
          transition: 'box-shadow 0.2s, border-color 0.2s',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#f4f5f7' }}>
          {episode.image ? (
            <Image
              src={episode.image.medium}
              alt={episode.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#97a0af'
            }}>
              <span style={{ fontSize: '24px' }}>{episode.name[0]}</span>
            </div>
          )}
        </div>
        <Box padding="space.150">
          <Stack space="space.100">
            <div>
              <Lozenge>S{episode.season} {label}</Lozenge>
            </div>
            <Heading size="small" as="h3">
              <span style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: 'var(--ds-text)'
              }}>
                {episode.name}
              </span>
            </Heading>
            {episode.airdate && (
              <Text size="small" color="color.text.subtlest">
                {episode.airdate}
              </Text>
            )}
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};
