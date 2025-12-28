import { notFound } from 'next/navigation';
import { getEpisode } from '@/lib/api';
import { STRINGS } from '@/constants/strings';
import type { Metadata } from 'next';
import { EpisodeDetail } from '@/components/EpisodeDetail';

interface EpisodePageProps {
  params: Promise<{ id: string }>;
}

const stripHtml = (html: string | null): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

export const generateMetadata = async ({ params }: EpisodePageProps): Promise<Metadata> => {
  const { id } = await params;
  const episodeId = parseInt(id, 10);

  if (isNaN(episodeId)) {
    return { title: STRINGS.errors.episodeNotFound };
  }

  try {
    const episode = await getEpisode(episodeId);
    return {
      title: `${episode.name} - ${STRINGS.app.title}`,
      description: stripHtml(episode.summary) || episode.name,
    };
  } catch {
    return { title: STRINGS.errors.episodeNotFound };
  }
};

const EpisodePage = async ({ params }: EpisodePageProps) => {
  const { id } = await params;
  const episodeId = parseInt(id, 10);

  if (isNaN(episodeId)) {
    notFound();
  }

  let episode;
  try {
    episode = await getEpisode(episodeId);
  } catch {
    notFound();
  }

  return <EpisodeDetail episode={episode} />;
};

export default EpisodePage;
