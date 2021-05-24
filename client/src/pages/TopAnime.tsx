import { Flex, Text } from '@chakra-ui/layout';
import { Alert, AlertIcon, AlertTitle, Spinner } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { topAnimeResultsData } from '../api/api';

export const TopAnime = () => {
  const {
    isLoading,
    isFetching,
    data: topAnimeData,
    error,
    isError,
  } = useQuery('search', async () => {
    return topAnimeResultsData();
  });

  const topAnimeResults = _.map(topAnimeData, (anime) => {
    return <Text>Top Anime</Text>;
  });
  if (isLoading || isFetching) {
    return (
      <Flex h="100vh" justify="center">
        <Spinner color="blue" />
      </Flex>
    );
  }

  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
    </Alert>;
  }

  if (!topAnimeData) {
    return null;
  }

  // console.log('top anime', data);

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Top Anime
      </Text>
      {topAnimeResults}
      {JSON.stringify(topAnimeData, null, 2)}
    </Flex>
  );
  // const { topAnimeResults } = props;

  // console.log('top-anime hello');

  // const topAnimeSearchResults = _.map(topAnimeResults, (anime) => {
  //   console.log('top-anime-name', anime.name);
  //   return <Text>{anime.name}</Text>;
  // });
  // return <Flex>{topAnimeResultsTwo}</Flex>;
};
