export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: WebChannel | null;
  dvdCountry: Country | null;
  externals: Externals;
  image: Image | null;
  summary: string | null;
  updated: number;
  _links: Links;
}

export interface Schedule {
  time: string;
  days: string[];
}

export interface Rating {
  average: number | null;
}

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface WebChannel {
  id: number;
  name: string;
  country: Country | null;
  officialSite: string | null;
}

export interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Links {
  self: Link;
  previousepisode?: Link;
}

export interface Link {
  href: string;
  name?: string;
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number | null;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number | null;
  rating: Rating;
  image: Image | null;
  summary: string | null;
  _links: Links;
}

export interface Season {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number | null;
  premiereDate: string | null;
  endDate: string | null;
  network: Network | null;
  webChannel: WebChannel | null;
  image: Image | null;
  summary: string | null;
  _links: Links;
}
