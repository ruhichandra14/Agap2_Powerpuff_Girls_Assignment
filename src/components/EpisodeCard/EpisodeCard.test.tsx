import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EpisodeCard } from './index';
import type { Episode } from '@/types/tvmaze';

const mockEpisode: Episode = {
  id: 1,
  url: 'https://example.com/episode/1',
  name: 'Test Episode',
  season: 1,
  number: 5,
  type: 'regular',
  airdate: '2023-01-15',
  airtime: '19:00',
  airstamp: '2023-01-15T19:00:00+00:00',
  runtime: 30,
  rating: { average: 8.5 },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original.jpg',
  },
  summary: '<p>Test summary</p>',
  _links: {
    self: { href: 'https://example.com/episode/1' },
  },
};

describe('EpisodeCard', () => {
  it('renders episode title', () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText('Test Episode')).toBeInTheDocument();
  });

  it('renders season and episode number', () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText('S1 E5')).toBeInTheDocument();
  });

  it('renders air date', () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText('2023-01-15')).toBeInTheDocument();
  });

  it('has accessible link', () => {
    render(<EpisodeCard episode={mockEpisode} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/episode/1');
  });

  it('handles special episodes', () => {
    const specialEpisode = { ...mockEpisode, number: null };
    render(<EpisodeCard episode={specialEpisode} />);
    expect(screen.getByText('S1 Special')).toBeInTheDocument();
  });
});
