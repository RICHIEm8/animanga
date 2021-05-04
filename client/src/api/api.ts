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
  chapters: number;
  score: number;
  rated: string;
  alternative_names: string;
  anime: [];
  manga: [];
  name: string;
}

export interface MangaResult {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  chapters: number;
  score: number;
  rated: string;
}

export interface CharactersResult {
  mal_id: number;
  name: string;
  image_url: string;
  alternative_names: string;
  anime: [];
  manga: [];
}

export interface PeopleResult {
  mal_id: number;
  name: string;
  alternative_names: string;
  image_url: string;
}

export const animeResults = async (query: string): Promise<AnimeResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/anime/${query}`);

  console.log('anime', results.data);

  return results.data;
};
export const mangaResults = async (query: string): Promise<MangaResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/manga/${query}`);

  console.log('manga result', results.data);

  return results.data;
};

export const charactersResults = async (query: string): Promise<CharactersResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/character/${query}`);

  console.log('character', results.data);

  return results.data;
};

export const personResults = async (query: string): Promise<AnimeResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/person/${query}`);

  console.log('person', results.data);

  return results.data;
};
