import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getShow, getEpisodes, getEpisode, searchEpisodes } from './api';

const mockShow = {
  id: 6771,
  name: 'Powerpuff Girls',
  genres: ['Action', 'Adventure', 'Comedy'],
  status: 'Ended',
  premiered: '1998-11-18',
  summary: '<p>The Powerpuff Girls is an animated series...</p>',
  image: { medium: 'https://example.com/medium.jpg', original: 'https://example.com/original.jpg' },
  rating: { average: 7.9 },
  network: { id: 1, name: 'Cartoon Network', country: { name: 'US', code: 'US', timezone: 'EST' }, officialSite: null },
};

const mockEpisodes = [
  {
    id: 1,
    name: 'Meat Fuzzy Lumpkins',
    season: 1,
    number: 1,
    summary: '<p>First episode</p>',
    airdate: '1998-11-18',
    image: null,
    rating: { average: 8.0 },
  },
  {
    id: 2,
    name: 'Insect Inside',
    season: 1,
    number: 2,
    summary: '<p>Second episode</p>',
    airdate: '1998-11-18',
    image: null,
    rating: { average: 7.5 },
  },
];

describe('API Functions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getShow', () => {
    it('should fetch and return show data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockShow),
      });

      const result = await getShow();

      expect(fetch).toHaveBeenCalledWith(
        'https://api.tvmaze.com/shows/6771',
        expect.objectContaining({ next: { revalidate: 3600 } })
      );
      expect(result).toEqual(mockShow);
    });

    it('should throw an error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(getShow()).rejects.toThrow('Failed to fetch show: 404');
    });
  });

  describe('getEpisodes', () => {
    it('should fetch and return episodes', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes),
      });

      const result = await getEpisodes();

      expect(fetch).toHaveBeenCalledWith(
        'https://api.tvmaze.com/shows/6771/episodes',
        expect.objectContaining({ next: { revalidate: 3600 } })
      );
      expect(result).toEqual(mockEpisodes);
    });

    it('should throw an error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(getEpisodes()).rejects.toThrow('Failed to fetch episodes: 500');
    });
  });

  describe('getEpisode', () => {
    it('should fetch a single episode by ID', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes[0]),
      });

      const result = await getEpisode(1);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.tvmaze.com/episodes/1',
        expect.objectContaining({ next: { revalidate: 3600 } })
      );
      expect(result).toEqual(mockEpisodes[0]);
    });

    it('should throw an error when episode is not found', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(getEpisode(999)).rejects.toThrow('Failed to fetch episode: 404');
    });
  });

  describe('searchEpisodes', () => {
    it('should return all episodes when search query is empty', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes),
      });

      const result = await searchEpisodes('');

      expect(result).toEqual(mockEpisodes);
    });

    it('should filter episodes by name', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes),
      });

      const result = await searchEpisodes('Meat');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Meat Fuzzy Lumpkins');
    });

    it('should filter episodes by summary', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes),
      });

      const result = await searchEpisodes('Second');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Insect Inside');
    });

    it('should return empty array when no matches found', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes),
      });

      const result = await searchEpisodes('nonexistent');

      expect(result).toHaveLength(0);
    });

    it('should be case insensitive', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEpisodes),
      });

      const result = await searchEpisodes('MEAT');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Meat Fuzzy Lumpkins');
    });
  });
});
