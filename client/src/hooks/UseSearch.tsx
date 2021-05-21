import { useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

export const useSearch = () => {
  const [category, setCategory] = useQueryParam('category', StringParam);
  const [query, setQuery] = useQueryParam('query', StringParam);
  const [currentQuery, setCurrentQuery] = useState(query);
  const [currentCategory, setCurrentCategory] = useState(category);

  return {
    category,
    setCategory,
    query,
    setQuery,
    currentCategory,
    setCurrentCategory,
    currentQuery,
    setCurrentQuery,
  };
};
