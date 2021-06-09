import axios from 'axios';
import Bluebird from 'bluebird';

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
    adaptation?: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
    alternative_version?: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
    side_story?: [
      {
        mal_id: number;
        type: string;
        name: string;
      }
    ];
    spin_off?: [
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

export interface AnimeVideos {
  promo: [
    {
      title: string;
      image_url: string;
      video_url: string;
    }
  ];
  episodes: [
    {
      title: string;
      episode: string;
      url: string;
      image_url: string;
    }
  ];
}

export interface AnimeCharacters {
  characters: [
    {
      mal_id: number;
      image_url: string;
      name: string;
      role: string;
      voice_actors: [
        {
          mal_id: number;
          name: string;
          imague_url: string;
          language: string;
        }
      ];
    }
  ];
}

export interface AnimeReviews {
  reviews: [
    {
      mal_id: number;
      content: string;
      date: string;
      reviewer: {
        username: string;
        scores: {
          overall: number;
        };
      };
    }
  ];
}

export interface AnimeNews {
  articles: [
    {
      title: string;
      date: string;
      author_name: string;
      image_url: string;
      intro: string;
    }
  ];
}

export interface AnimeRecommendations {
  recommendations: [
    {
      mal_id: number;
      image_url: string;
      title: string;
      recommendation_count: number;
    }
  ];
}

export interface CombinedAnimeResponse {
  details: Anime;
  videos: AnimeVideos;
  characters: AnimeCharacters;
  reviews: AnimeReviews;
  news: AnimeNews;
  recommendations: AnimeRecommendations;
}

export const categorisedResultsResponse = async (category: string, query: string) => {
  const results = await axios.get(`http://localhost:8080/search/${category}/${query}`);

  return results.data;
};

export const topResultsResponse = async (category: string, subtype?: string) => {
  const results = await axios.get(`http://localhost:8080/top/${category}/1/${subtype ?? ''}`);

  return results.data;
};

export const animeDetailsResponse = async (category: string, id: number): Promise<Anime> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/`);

  return results.data;
};

export const animeVideosResponse = async (category: string, id: number): Promise<AnimeVideos> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/videos`);

  return results.data;
};

export const animeCharactersResponse = async (
  category: string,
  id: number
): Promise<AnimeCharacters> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/characters_staff`);

  return results.data;
};

export const animeReviewsResponse = async (category: string, id: number): Promise<AnimeReviews> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/reviews`);

  return results.data;
};

export const animeNewsResponse = async (category: string, id: number): Promise<AnimeNews> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/news`);

  return results.data;
};

export const animeRecommendationsResponse = async (
  category: string,
  id: number
): Promise<AnimeRecommendations> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/recommendations`);

  return results.data;
};

export const combinedAnimeResponse = async (
  category: string,
  id: number
): Promise<CombinedAnimeResponse> => {
  const [details, videos, characters, reviews, news, recommendations] = await Promise.all([
    animeDetailsResponse(category, id),
    animeVideosResponse(category, id),
    animeCharactersResponse(category, id),
    animeReviewsResponse(category, id),
    animeNewsResponse(category, id),
    animeRecommendationsResponse(category, id),
  ]);
  return {
    details,
    videos,
    characters,
    reviews,
    news,
    recommendations,
  };
};
