import _ from 'lodash';
import React from 'react';
import react, { useState } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';
import { AnimeResult, animeResults } from '../api/api';

interface SearchContext {
  category: string | null | undefined;
  setCategory: (category: string) => void;
  query: string | null | undefined;
  setQuery: (query: string) => void;
  isFetching: boolean;
  searchData: AnimeResult[];
  error: unknown;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<AnimeResult[] | undefined, unknown>>;
}

export const SearchContext = React.createContext<SearchContext>(null as any);

export const SearchContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [category, setCategory] = useQueryParam('category', StringParam);
  const [query, setQuery] = useQueryParam('query', StringParam);
  const [searchData, setSearchData] = useState([]);

  const { isFetching, data, error, isError, refetch } = useQuery(
    query || 'query',
    () => {
      if (!_.isNil(category) && !_.isNil(query)) {
        return animeResults(category, query);
      }
    },
    { enabled: false }
  );

  React.useEffect(() => {
    console.log('setting new data as it changed', { prev: searchData, curr: data });
    if (data) {
      setSearchData(data as any);
    }
  }, [data]);

  const value = {
    category,
    setCategory,
    query,
    setQuery,
    isFetching,
    searchData,
    error,
    isError,
    refetch,
  };

  return <SearchContext.Provider value={value}>{props.children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  return React.useContext(SearchContext);
};
