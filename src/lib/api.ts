import { Show, Episode } from '@/types/tvmaze';

const BASE_URL = 'https://api.tvmaze.com';
const POWERPUFF_GIRLS_SHOW_ID = 6771;

export const getShow = async (): Promise<Show> => {
  const response = await fetch(`${BASE_URL}/shows/${POWERPUFF_GIRLS_SHOW_ID}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch show: ${response.status}`);
  }

  return response.json();
};

export const getEpisodes = async (): Promise<Episode[]> => {
  const response = await fetch(`${BASE_URL}/shows/${POWERPUFF_GIRLS_SHOW_ID}/episodes`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch episodes: ${response.status}`);
  }

  return response.json();
};

export const getEpisode = async (episodeId: number): Promise<Episode> => {
  const response = await fetch(`${BASE_URL}/episodes/${episodeId}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch episode: ${response.status}`);
  }

  return response.json();
};

export const searchEpisodes = async (query: string): Promise<Episode[]> => {
  const episodes = await getEpisodes();

  if (!query.trim()) {
    return episodes;
  }

  const searchTerm = query.toLowerCase();
  return episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      (episode.summary && episode.summary.toLowerCase().includes(searchTerm))
  );
};
