import { StringParam, useQueryParam } from 'use-query-params';

export const useTopSearch = () => {
  const [category, setCategory] = useQueryParam('category', StringParam);
  const [subtype, setSubtype] = useQueryParam('subtype', StringParam);

  return {
    category: category ?? '',
    setCategory,
    subtype: subtype === null ? undefined : subtype,
    setSubtype,
  };
};
