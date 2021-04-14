import { Alert, AlertIcon, AlertTitle, Flex, Spinner } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { StringParam, useQueryParam } from 'use-query-params';
import { animeResults } from '../api/api';
import { Anime } from '../components/Anime';

export const Results = () => {
  const [category] = useQueryParam('category', StringParam);
  const [searchTerm] = useQueryParam('searchTerm', StringParam);

  const { isFetching, data, error, isError } = useQuery(searchTerm || 'searchTerm', () => {
    if (!_.isNil(category) && !_.isNil(searchTerm)) {
      return animeResults(category, searchTerm);
    }
  });

  if (isFetching) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="red" />
      </Flex>
    );
  }
  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
    </Alert>;
  }

  if (!data) {
    return null;
  }

  return <Anime animeResults={data} />;
};
