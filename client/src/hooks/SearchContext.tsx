import _ from 'lodash';
import React, { useState } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';
import {
  AnimeResult,
  animeResults,
  CharactersResult,
  charactersResults,
  MangaResult,
  mangaResults,
  PeopleResult,
  peopleResults,
} from '../api/api';

export interface AllSearchResult {
  animeResults: AnimeResult[];
  mangaResults: MangaResult[];
  charactersResults: CharactersResult[];
  peopleResults: PeopleResult[];
}

interface SearchContext {
  category: string | null | undefined;
  setCategory: (category: string) => void;
  currentCategory: string | null | undefined;
  setCurrentCategory: (currentCategory: string) => void;
  query: string | null | undefined;
  setQuery: (query: string) => void;
  isFetching: boolean;
  data: AllSearchResult | undefined;
  error: unknown;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<AllSearchResult | undefined, unknown>>;
}

const doSearch = async (
  category: string | undefined | null,
  query: string | undefined | null
): Promise<AllSearchResult> => {
  if (_.isNil(query)) {
    return {
      animeResults: [],
      mangaResults: [],
      charactersResults: [],
      peopleResults: [],
    };
  } else if (category === 'all') {
    return {
      animeResults: await animeResults(query),
      mangaResults: await mangaResults(query),
      charactersResults: await charactersResults(query),
      peopleResults: await peopleResults(query),
    };
  } else if (category === 'anime') {
    return {
      animeResults: await animeResults(query),
      mangaResults: [],
      charactersResults: [],
      peopleResults: [],
    };
  } else if (category === 'manga') {
    return {
      animeResults: [],
      mangaResults: await mangaResults(query),
      charactersResults: [],
      peopleResults: [],
    };
  } else if (category === 'characters') {
    return {
      animeResults: [],
      mangaResults: [],
      charactersResults: await charactersResults(query),
      peopleResults: [],
    };
  } else if (category === 'people') {
    return {
      animeResults: [],
      mangaResults: [],
      charactersResults: [],
      peopleResults: await peopleResults(query),
    };
  }
  return {
    animeResults: [],
    mangaResults: [],
    charactersResults: [],
    peopleResults: [],
  };
};

export const SearchContext = React.createContext<SearchContext>(null as any);

export const SearchContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [category, setCategory] = useQueryParam('category', StringParam);
  const [currentCategory, setCurrentCategory] = useState<string | null | undefined>();
  const [query, setQuery] = useQueryParam('query', StringParam);

  const { isFetching, data, error, isError, refetch } = useQuery(
    'search',
    async () => {
      const search = await doSearch(category, query);
      setCurrentCategory(category);
      return search;
    },
    { enabled: false }
  );

  const value = {
    category,
    setCategory,
    currentCategory,
    setCurrentCategory,
    query,
    setQuery,
    isFetching,
    data,
    error,
    isError,
    refetch,
  };

  return <SearchContext.Provider value={value}>{props.children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  return React.useContext(SearchContext);
};
