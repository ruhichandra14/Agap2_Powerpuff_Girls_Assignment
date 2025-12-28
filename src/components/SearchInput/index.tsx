'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import Textfield from '@atlaskit/textfield';
import Spinner from '@atlaskit/spinner';
import SearchIcon from '@atlaskit/icon/core/search';
import { STRINGS } from '@/constants/strings';

export const SearchInput = ({ placeholder = 'Search episodes...' }: { placeholder?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }
      startTransition(() => {
        router.replace(`/?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor="episode-search" className="sr-only">
        {STRINGS.episodes.searchPlaceholder}
      </label>
      <Textfield
        id="episode-search"
        name="search"
        placeholder={placeholder}
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
        elemBeforeInput={
          <span style={{ paddingLeft: '8px', display: 'flex', alignItems: 'center' }}>
            <SearchIcon label="" color="currentColor" />
          </span>
        }
        elemAfterInput={
          isPending ? (
            <span style={{ paddingRight: '8px', display: 'flex', alignItems: 'center' }}>
              <Spinner size="small" />
            </span>
          ) : undefined
        }
      />
    </div>
  );
};
