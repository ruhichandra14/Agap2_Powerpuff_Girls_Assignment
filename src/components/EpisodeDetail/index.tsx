'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@atlaskit/button/new';
import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';
import Heading from '@atlaskit/heading';
import Lozenge from '@atlaskit/lozenge';
import { Box, Inline, Stack, Text } from '@atlaskit/primitives';
import ArrowLeftIcon from '@atlaskit/icon/core/arrow-left';
import { Episode } from '@/types/tvmaze';
import { STRINGS } from '@/constants/strings';

const stripHtml = (html: string | null) => html?.replace(/<[^>]*>/g, '') || '';

export const EpisodeDetail = ({ episode }: { episode: Episode }) => {
  const label = episode.number ? `Episode ${episode.number}` : 'Special';

  return (
    <article style={{ maxWidth: '896px', margin: '0 auto' }}>
      <Box paddingBlockEnd="space.200">
        <Breadcrumbs>
          <BreadcrumbsItem href="/" text={STRINGS.nav.home} component={Link} />
          <BreadcrumbsItem text={episode.name} />
        </Breadcrumbs>
      </Box>

      <Box
        backgroundColor="elevation.surface"
        padding="space.0"
        style={{
          borderRadius: '3px',
          border: '1px solid var(--ds-border)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: '#f4f5f7' }}>
          {episode.image ? (
            <Image
              src={episode.image.original}
              alt={episode.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f4f5f7'
            }}>
              <span style={{ fontSize: '48px', color: '#c1c7d0' }}>{episode.name[0]}</span>
            </div>
          )}
        </div>

        <Box padding="space.300">
          <Stack space="space.200">
            <Inline space="space.100">
              <Lozenge>Season {episode.season}</Lozenge>
              <Lozenge>{label}</Lozenge>
            </Inline>

            <Heading size="xlarge" as="h1">
              {episode.name}
            </Heading>

            {episode.summary && (
              <Text as="p" color="color.text.subtle">
                {stripHtml(episode.summary)}
              </Text>
            )}

            <Box
              paddingBlockStart="space.200"
              style={{ borderTop: '1px solid var(--ds-border)' }}
            >
              <div className="episode-meta-grid">
                {episode.airdate && (
                  <Stack space="space.050">
                    <Text size="small" color="color.text.subtlest">
                      {STRINGS.episodes.airDate}
                    </Text>
                    <Text weight="medium">
                      {episode.airdate}
                    </Text>
                  </Stack>
                )}
                {episode.airtime && (
                  <Stack space="space.050">
                    <Text size="small" color="color.text.subtlest">
                      {STRINGS.episodes.airTime}
                    </Text>
                    <Text weight="medium">
                      {episode.airtime}
                    </Text>
                  </Stack>
                )}
                {episode.runtime && (
                  <Stack space="space.050">
                    <Text size="small" color="color.text.subtlest">
                      {STRINGS.episodes.runtime}
                    </Text>
                    <Text weight="medium">
                      {episode.runtime} {STRINGS.episodes.runtimeUnit}
                    </Text>
                  </Stack>
                )}
                {episode.rating.average && (
                  <Stack space="space.050">
                    <Text size="small" color="color.text.subtlest">
                      {STRINGS.show.rating}
                    </Text>
                    <Text weight="medium">
                      {episode.rating.average}/10
                    </Text>
                  </Stack>
                )}
              </div>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box paddingBlockStart="space.300">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button iconBefore={ArrowLeftIcon}>
            {STRINGS.navigation.backToEpisodes}
          </Button>
        </Link>
      </Box>
    </article>
  );
};
