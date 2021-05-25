import {
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Flex,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  Image,
  VStack,
  Link,
  Heading,
} from '@chakra-ui/react';
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
    const airingDate = () => {
      let startDate = new Date(anime.start_date).toDateString().split(' ');
      let endDate = new Date(anime.end_date).toDateString().split(' ');

      let fixedStartDate = _.remove(startDate, (_v, i) => i === 1 || i === 3).join(' ');
      let fixedEndDate = _.remove(endDate, (_v, i) => i === 1 || i === 3).join(' ');

      return (
        <Text>
          {fixedStartDate} - {fixedEndDate}
        </Text>
      );
    };

    return (
      <ListItem
        listStyleType="none"
        key={anime.mal_id}
        ml={-16.5}
        borderBottom="1px solid #E1E7F5"
        borderX="1px solid #E1E7F5"
      >
        <HStack color="#2E51A2" spacing={0} textAlign="center">
          <Text w={200}>999</Text>
          <HStack align="left" w={700} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={75} h={100} fit="cover" src={anime.image_url} />
            <VStack textAlign="left" align="left">
              <Link>
                <Heading color="#2E51A2" size="md">
                  {anime.title}
                </Heading>
              </Link>
              <Text>
                {anime.type} ({anime.episodes} eps)
              </Text>
              {airingDate()}
            </VStack>
          </HStack>
          <Text w={200}>{anime.score}</Text>
        </HStack>
      </ListItem>
    );
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

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Top Anime
      </Text>
      <HStack bgColor="#2E51A2" color="white" spacing={0} textAlign="center">
        <Text w={200} borderRight="1px solid #E1E7F5">
          Rank
        </Text>
        <Text w={700} borderRight="1px solid #E1E7F5">
          Title
        </Text>
        <Text w={200}>Score</Text>
      </HStack>
      <UnorderedList>{topAnimeResults}</UnorderedList>
    </Flex>
  );
};
