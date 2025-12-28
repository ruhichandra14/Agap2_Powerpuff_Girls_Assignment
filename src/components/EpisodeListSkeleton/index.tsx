'use client';

import { Box } from '@atlaskit/primitives';
import { STRINGS } from '@/constants/strings';

export const EpisodeListSkeleton = () => (
  <div
    className="episode-grid"
    aria-busy="true"
    aria-label={STRINGS.episodes.loading}
  >
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Box
        key={i}
        backgroundColor="elevation.surface"
        padding="space.0"
        style={{
          borderRadius: '3px',
          border: '1px solid var(--ds-border)',
          overflow: 'hidden',
        }}
      >
        <div className="skeleton-image" />
        <div style={{ padding: '12px' }}>
          <div className="skeleton-line" style={{ width: '40%' }} />
          <div className="skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton-line" style={{ width: '50%' }} />
        </div>
      </Box>
    ))}
  </div>
);
