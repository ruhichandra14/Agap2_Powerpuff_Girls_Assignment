import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EpisodeList } from './index';
import type { Episode } from '@/types/tvmaze';

const mockEpisodes: Episode[] = [
  {
    id: 1,
    url: 'https://example.com/episode/1',
    name: 'Episode One',
    season: 1,
    number: 1,
    type: 'regular',
    airdate: '2023-01-01',
    airtime: '19:00',
    airstamp: '2023-01-01T19:00:00+00:00',
    runtime: 30,
    rating: { average: 8.0 },
    image: null,
    summary: '<p>First episode</p>',
    _links: { self: { href: 'https://example.com/1' } },
  },
  {
    id: 2,
    url: 'https://example.com/episode/2',
    name: 'Episode Two',
    season: 1,
    number: 2,
    type: 'regular',
    airdate: '2023-01-08',
    airtime: '19:00',
    airstamp: '2023-01-08T19:00:00+00:00',
    runtime: 30,
    rating: { average: 7.5 },
    image: null,
    summary: '<p>Second episode</p>',
    _links: { self: { href: 'https://example.com/2' } },
  },
];

describe('EpisodeList', () => {
  it('renders all episodes', () => {
    render(<EpisodeList episodes={mockEpisodes} />);
    expect(screen.getByText('Episode One')).toBeInTheDocument();
    expect(screen.getByText('Episode Two')).toBeInTheDocument();
  });

  it('displays episode count', () => {
    render(<EpisodeList episodes={mockEpisodes} />);
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });

  it('shows empty state when no episodes', () => {
    render(<EpisodeList episodes={[]} />);
    expect(screen.getByText('No episodes available')).toBeInTheDocument();
  });

  it('shows search empty state', () => {
    render(<EpisodeList episodes={[]} searchQuery="test" />);
    expect(screen.getByText('No episodes found matching "test"')).toBeInTheDocument();
  });
});
