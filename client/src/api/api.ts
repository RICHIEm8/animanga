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
}

export const animeResults = async (category: string, query: string): Promise<AnimeResult[]> => {
  const results = await axios.get(`http://localhost:8080/search/${category}/${query}`);

  return results.data;
};
