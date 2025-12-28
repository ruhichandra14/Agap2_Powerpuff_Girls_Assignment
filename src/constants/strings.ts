export const STRINGS = {
  app: {
    title: 'Powerpuff Girls',
    description: 'Explore episodes of The Powerpuff Girls TV show',
  },
  nav: {
    skipToContent: 'Skip to main content',
    home: 'Home',
  },
  show: {
    premiered: 'Premiered',
    status: 'Status',
    network: 'Network',
    rating: 'Rating',
  },
  episodes: {
    title: 'Episodes',
    searchPlaceholder: 'Search episodes...',
    noResults: (query: string) => `No episodes found matching "${query}"`,
    noEpisodes: 'No episodes available',
    loading: 'Loading...',
    season: 'Season',
    episode: 'Episode',
    special: 'Special',
    airDate: 'Air Date',
    airTime: 'Air Time',
    runtime: 'Runtime',
    runtimeUnit: 'min',
    viewDetails: (season: number, episode: string, name: string) =>
      `View details for Season ${season} ${episode}: ${name}`,
  },
  navigation: {
    backToEpisodes: 'Back to episodes',
  },
  errors: {
    episodeNotFound: 'Episode Not Found',
    episodeNotFoundDesc: "The episode you're looking for doesn't exist or has been removed.",
  },
  footer: {
    dataProvider: 'Data provided by',
    apiName: 'TVMaze API',
  },
} as const;
