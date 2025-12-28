'use client';

import Image from 'next/image';
import Heading from '@atlaskit/heading';
import Lozenge from '@atlaskit/lozenge';
import { Box, Inline, Stack, Text } from '@atlaskit/primitives';
import { Show } from '@/types/tvmaze';
import { STRINGS } from '@/constants/strings';
const stripHtml = (html: string | null) => html?.replace(/<[^>]*>/g, '') || '';

export const ShowCard = ({ show }: { show: Show }) => {
  const description = stripHtml(show.summary);

  return (
    <article aria-labelledby="show-title" aria-describedby="show-description">
      <Box
        backgroundColor="elevation.surface"
        padding="space.0"
        style={{
          borderRadius: '3px',
          border: '1px solid var(--ds-border)',
          overflow: 'hidden',
        }}
      >
        <div className="show-card-layout">
          <figure className="show-card-image">
            {show.image ? (
              <Image
                src={show.image.original}
                alt=""
                width={400}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '256px',
                  backgroundColor: '#f4f5f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-hidden="true"
              >
                <span style={{ color: '#97a0af', fontSize: '32px', fontWeight: 'bold' }}>
                  {show.name[0]}
                </span>
              </div>
            )}
          </figure>
          <div className="show-card-content">
            <Box padding="space.300">
              <Stack space="space.200">
                <header>
                  <Heading size="xlarge" as="h1" id="show-title">
                    {show.name}
                  </Heading>
                  <div style={{ marginTop: '12px' }}>
                    <Inline space="space.100">
                      {show.genres.map((genre) => (
                        <Lozenge key={genre} appearance="default">
                          {genre}
                        </Lozenge>
                      ))}
                    </Inline>
                  </div>
                </header>

                <Text id="show-description" as="p">
                  {description}
                </Text>

                <div className="show-meta-grid">
                  {show.premiered && (
                    <Stack space="space.050">
                      <Text size="small" color="color.text.subtlest">
                        {STRINGS.show.premiered}
                      </Text>
                      <Text weight="medium">
                        {show.premiered}
                      </Text>
                    </Stack>
                  )}
                  {show.status && (
                    <Stack space="space.050">
                      <Text size="small" color="color.text.subtlest">
                        {STRINGS.show.status}
                      </Text>
                      <Text weight="medium">
                        {show.status}
                      </Text>
                    </Stack>
                  )}
                  {show.network && (
                    <Stack space="space.050">
                      <Text size="small" color="color.text.subtlest">
                        {STRINGS.show.network}
                      </Text>
                      <Text weight="medium">
                        {show.network.name}
                      </Text>
                    </Stack>
                  )}
                  {show.rating.average && (
                    <Stack space="space.050">
                      <Text size="small" color="color.text.subtlest">
                        {STRINGS.show.rating}
                      </Text>
                      <Text weight="medium">
                        {show.rating.average}/10
                      </Text>
                    </Stack>
                  )}
                </div>
              </Stack>
            </Box>
          </div>
        </div>
      </Box>
    </article>
  );
};
