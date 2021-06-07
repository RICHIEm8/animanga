import { NumberInputFieldProps } from '@chakra-ui/number-input';
import axios from 'axios';
import { SubscriptionManager } from 'framer-motion/types/utils/subscription-manager';

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

export interface TopAnimeList {
  mal_id: number;
  url: string;
  title: string;
  image_url: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  rated: string;
  members: number;
  rank: number;
}

export interface TopMangaList {
  mal_id: number;
  url: string;
  title: string;
  image_url: string;
  type: string;
  volumes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rank: number;
}

export interface TopCharactersResult {
  mal_id: number;
  rank: number;
  title: string;
  image_url: string;
  url: string;
  name_kanji: string;
  animeography: {
    mal_id: number;
    name: string;
    type: string;
    url: string;
  }[];
  mangaography: {
    mal_id: number;
    name: string;
    type: string;
    url: string;
  }[];
}

export interface TopPeopleResult {
  birthday: string;
  favorites: number;
  mal_id: number;
  image_url: string;
  name_kanji: string;
  rank: number;
  title: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  image_url: string;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  rank: number;
  synopsis: string;
  premiered: string;
  related: {
    Adaption: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
    Alternative_version: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
    Side_story: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
    Spin_off: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
  };
  producers: [
    {
      mal_id: number;
      name: string;
    }
  ];
  studios: [
    {
      mal_id: number;
      name: string;
    }
  ];
  genres: [
    {
      name: string;
    }
  ];
  opening_themes: string[];
  ending_themes: string[];
}

export const categorisedResultsResponse = async (category: string, query: string) => {
  const results = await axios.get(`http://localhost:8080/search/${category}/${query}`);

  return results.data;
};

export const topResultsResponse = async (category: string, subtype?: string) => {
  const results = await axios.get(`http://localhost:8080/top/${category}/1/${subtype ?? ''}`);

  return results.data;
};

export const singleResultResponse = async (category: string, id: number, request?: string) => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/${request ?? ''}`);

  return results.data;
};
