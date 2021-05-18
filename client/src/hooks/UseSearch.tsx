import _ from 'lodash';
import { StringParam, useQueryParam } from 'use-query-params';

export const useSearch = () => {
  const [category, setCategory] = useQueryParam('category', StringParam);
  const [query, setQuery] = useQueryParam('query', StringParam);

  return {
    category,
    setCategory,
    query,
    setQuery,
  };
};
