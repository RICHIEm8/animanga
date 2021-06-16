import axios from 'axios';
import Bluebird from 'bluebird';

export interface AnimeResultResponse {
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

export interface MangaResultResponse {
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

export interface CharactersResultResponse {
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

export interface PeopleResultResponse {
  mal_id: number;
  url: string;
  name: string;
  alternative_names: string;
  image_url: string;
}

export interface TopAnimeListResponse {
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

export interface TopMangaListResponse {
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

export interface TopCharactersResultResponse {
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

export interface TopPeopleResultResponse {
  birthday: string;
  favorites: number;
  mal_id: number;
  image_url: string;
  name_kanji: string;
  rank: number;
  title: string;
  url: string;
}

export interface AnimeResponse {
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

export interface AnimeVideosResponse {
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

export interface AnimeCharactersStaffResponse {
  characters: {
    mal_id: number;
    image_url: string;
    name: string;
    role: string;
    voice_actors: {
      mal_id: number;
      image_url: string;
      name: string;
      language: string;
    }[];
  }[];
  staff: {
    mal_id: number;
    name: string;
    image_url: string;
    positions: string[];
  }[];
}

export interface AnimeReviewsResponse {
  reviews: {
    mal_id: number;
    date: string;
    content: string;
    reviewer: {
      image_url: string;
      username: string;
      scores: {
        overall: number;
      };
    };
  }[];
}

export interface AnimeNewsResponse {
  articles: {
    title: string;
    date: string;
    author_name: string;
    image_url: string;
    intro: string;
  }[];
}

// export interface AnimeRecommendationsResponse {
//   recommendations: [
//     {
//       mal_id: number;
//       image_url: string;
//       title: string;
//       recommendation_count: number;
//     }
//   ];
// }

export interface CombinedAnimeResponse {
  details: AnimeResponse;
  videos: AnimeVideosResponse;
  charactersStaff: AnimeCharactersStaffResponse;
  reviews: AnimeReviewsResponse;
  news: AnimeNewsResponse;
  // recommendations: AnimeRecommendations;
}

export const getCategorisedResults = async (category: string, query: string) => {
  const results = await axios.get(`http://localhost:8080/search/${category}/${query}`);

  return results.data;
};

export const getTopResults = async (category: string, subtype?: string) => {
  const results = await axios.get(`http://localhost:8080/top/${category}/1/${subtype ?? ''}`);

  return results.data;
};

export const getAnimeDetails = async (category: string, id: number): Promise<AnimeResponse> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/`);

  return results.data;
};

export const getAnimeVideos = async (
  category: string,
  id: number
): Promise<AnimeVideosResponse> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/videos`);

  return results.data;
};

export const getAnimeCharactersStaff = async (
  category: string,
  id: number
): Promise<AnimeCharactersStaffResponse> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/characters_staff`);

  return results.data;
};

export const getAnimeReviews = async (
  category: string,
  id: number
): Promise<AnimeReviewsResponse> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/reviews`);

  return results.data;
};

export const getAnimeNews = async (category: string, id: number): Promise<AnimeNewsResponse> => {
  const results = await axios.get(`http://localhost:8080/${category}/${id}/news`);

  return results.data;
};

// export const animeRecommendationsResponse = async (
//   category: string,
//   id: number
// ): Promise<AnimeRecommendations> => {
//   const results = await axios.get(`http://localhost:8080/${category}/${id}/recommendations`);

//   return results.data;
// };

export const combinedAnimeResponse = async (
  category: string,
  id: number
): Promise<CombinedAnimeResponse> => {
  const [details, videos, charactersStaff, reviews, news /*recommendations*/] = await Bluebird.map(
    [
      () => getAnimeDetails(category, id),
      () => getAnimeVideos(category, id),
      () => getAnimeCharactersStaff(category, id),
      () => getAnimeReviews(category, id),
      () => getAnimeNews(category, id),
      // () => animeRecommendationsResponse(category, id),
    ],
    (v) => v() as any,
    { concurrency: 2 }
  );
  return {
    details,
    videos,
    charactersStaff,
    reviews,
    news,
    // recommendations,
  };
};
