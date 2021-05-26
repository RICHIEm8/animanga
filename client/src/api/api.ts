import axios from 'axios';

export interface AnimeResult {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rated: string;
}

export interface MangaResult {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  publishing: boolean;
  synopsis: string;
  type: string;
  chapters: number;
  volumes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
}

export interface CharactersResult {
  mal_id: number;
  name: string;
  image_url: string;
  alternative_names: string;
  anime: {
    mal_id: string;
    type: string;
    name: string;
    url: string;
  }[];
  manga: {
    mal_id: string;
    type: string;
    name: string;
    url: string;
  }[];
}

export interface PeopleResult {
  mal_id: number;
  url: string;
  name: string;
  alternative_names: string;
  image_url: string;
}

export interface TopAnimeResult {
  mal_id: number;
  url: string;
  title: string;
  image_url: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  rated: string;
}
export interface TopMangaResult {
  mal_id: number;
  url: string;
  title: string;
  image_url: string;
  synopsis: string;
  type: string;
  chapters: number;
  score: number;
  start_date: string;
  end_date: string;
  rated: string;
  publishing: boolean;
}

export const animeResultsData = async (query: string): Promise<AnimeResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/anime/${query}`);

  return results.data;
};
export const mangaResultsData = async (query: string): Promise<MangaResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/manga/${query}`);

  return results.data;
};

export const charactersResultsData = async (query: string): Promise<CharactersResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/character/${query}`);

  return results.data;
};

export const peopleResultsData = async (query: string): Promise<PeopleResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/people/${query}`);

  return results.data;
};

export const topAnimeResultsData = async (): Promise<TopAnimeResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/anime/&order_by=score&sort=desc`);

  return results.data;
};
export const topMangaResultsData = async (): Promise<TopMangaResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/manga/&order_by=score&sort=desc`);

  return results.data;
};
