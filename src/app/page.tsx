import { Suspense } from 'react';
import { getShow, searchEpisodes } from '@/lib/api';
import { EpisodeList } from '@/components/EpisodeList';
import { SearchInput } from '@/components/SearchInput';
import { STRINGS } from '@/constants/strings';
import { ShowCard } from '@/components/ShowCard';
import { EpisodeListSkeleton } from '@/components/EpisodeListSkeleton';

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

const EpisodeListSection = async ({ searchQuery }: { searchQuery?: string }) => {
  const episodes = await searchEpisodes(searchQuery || '');
  return <EpisodeList episodes={episodes} searchQuery={searchQuery} />;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { q: searchQuery } = await searchParams;
  const show = await getShow();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ShowCard show={show} />

      <section aria-label={STRINGS.episodes.searchPlaceholder}>
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </section>

      <Suspense fallback={<EpisodeListSkeleton />}>
        <EpisodeListSection searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
};

export default HomePage;
