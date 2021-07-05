import {
  Alert,
  AlertIcon,
  AlertTitle,
  AspectRatio,
  Box,
  Flex,
  HStack,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  VStack,
  Image,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { getSeasonAnimeResults, getTopResults, homePageResponse } from '../api/api';

export const Home = () => {
  // const {
  //   isLoading,
  //   isFetching,
  //   data: seasonAnime,
  //   error,
  //   isError,
  // } = useQuery(
  //   'anime',
  //   () => {
  //     return getSeasonAnimeResults();
  //   },
  //   { refetchOnWindowFocus: false }
  // );
  const { isLoading, isFetching, data, error, isError } = useQuery(
    'anime',
    () => {
      return homePageResponse('anime');
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading || isFetching) {
    return (
      <Flex h="100vh" justify="center" mt={50}>
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

  if (!data) {
    return null;
  }

  const { seasonAnime, topAiring, topUpcoming, topPopular } = data;

  const currentSeasonAnimeList = _.map(_.take(seasonAnime.anime, 5), (anime) => {
    return (
      <ListItem key={anime.mal_id} listStyleType="none" h={200} position="relative">
        <Image w={135} fit="cover" src={anime.image_url} />
        <Text
          w={135}
          p={1}
          fontSize="xs"
          position="absolute"
          bottom="1px"
          color="white"
          fontWeight="bold"
          textShadow="-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
          backgroundImage="linear-gradient(rgba(255,0,0,0), rgba(0, 0, 0 ,1))"
        >
          {anime.title}
        </Text>
      </ListItem>
    );
  });

  const topAiringList = _.map(_.take(topAiring, 5), (anime) => {
    const epsCheck = () => {
      if (anime.episodes === null) {
        return '0';
      } else {
        return anime.episodes;
      }
    };

    return (
      <ListItem key={anime.mal_id} listStyleType="none" my={2}>
        <HStack spacing={0} alignItems="flex-start">
          <Text w={25} align="center" color="black" fontSize="lg">
            {anime.rank}
          </Text>
          <Image w={75} fit="cover" src={anime.image_url} p={1} />
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize="sm" w={200}>
              {anime.title}
            </Text>
            <Text fontSize="xs">{`${anime.type}, ${epsCheck()} eps, scored ${anime.score}`}</Text>
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  const topUpcomingList = _.map(_.take(topUpcoming, 5), (anime) => {
    const epsCheck = () => {
      if (anime.episodes === null) {
        return '0';
      } else {
        return anime.episodes;
      }
    };

    return (
      <ListItem key={anime.mal_id} listStyleType="none" my={2}>
        <HStack spacing={0} alignItems="flex-start">
          <Text w={25} align="center" color="black" fontSize="lg">
            {anime.rank}
          </Text>
          <Image w={75} fit="cover" src={anime.image_url} p={1} />
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize="sm" w={200}>
              {anime.title}
            </Text>
            <Text fontSize="xs">{`${anime.type}, ${epsCheck()} eps, scored ${anime.score}`}</Text>
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  const topPopularList = _.map(_.take(topPopular, 10), (anime) => {
    const epsCheck = () => {
      if (anime.episodes === null) {
        return '0';
      } else {
        return anime.episodes;
      }
    };

    return (
      <ListItem key={anime.mal_id} listStyleType="none" my={2}>
        <HStack spacing={0} alignItems="flex-start">
          <Text w={25} align="center" color="black" fontSize="lg">
            {anime.rank}
          </Text>
          <Image w={75} fit="cover" src={anime.image_url} p={1} />
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize="sm" w={200}>
              {anime.title}
            </Text>
            <Text fontSize="xs">{`${anime.type}, ${epsCheck()} eps, scored ${anime.score}`}</Text>
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Flex justify="center" flexDir="column" mx={200} borderX="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1} mb={25}>
        Welcome to AniMan
      </Text>
      <HStack alignItems="flex-start" h={1500}>
        <VStack w={720} pr={2} borderRight="1px solid #E1E7F5">
          <VStack spacing={0} ml={2} alignItems="flex-start">
            <Text fontWeight="bold">
              {seasonAnime.season_name} {seasonAnime.season_year} Anime
            </Text>
            <UnorderedList pt={2} borderTop="1px solid #E1E7F5">
              <HStack>{currentSeasonAnimeList}</HStack>
            </UnorderedList>
          </VStack>
        </VStack>
        <VStack w={300} alignItems="flex-start" mr={4}>
          <VStack w={300} mr={4} pr={4} mt={-4} alignItems="flex-start" spacing={0}>
            <Text
              justifyContent="space-evenly"
              fontWeight="bold"
              align="center"
              bgColor="#E1E7F5"
              w={300}
              py={2}
            >
              Top Airing Anime
            </Text>
            <UnorderedList bgColor="gray.100" w={300}>
              {topAiringList}
            </UnorderedList>
          </VStack>
          <VStack w={300} mt={-4} alignItems="flex-start" spacing={0}>
            <Text
              justifyContent="space-evenly"
              fontWeight="bold"
              align="center"
              bgColor="#E1E7F5"
              w={300}
              py={2}
            >
              Top Upcoming Anime
            </Text>
            <UnorderedList bgColor="gray.100" w={300}>
              {topUpcomingList}
            </UnorderedList>
          </VStack>
          <VStack w={300} mt={-4} alignItems="flex-start" spacing={0}>
            <Text
              justifyContent="space-evenly"
              fontWeight="bold"
              align="center"
              bgColor="#E1E7F5"
              w={300}
              py={2}
            >
              Most Popular Anime
            </Text>
            <UnorderedList bgColor="gray.100" w={300}>
              {topPopularList}
            </UnorderedList>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};
