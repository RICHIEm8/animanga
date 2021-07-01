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
import { getSeasonAnimeResults, getTopResults } from '../api/api';

export const Home = () => {
  const {
    isLoading,
    isFetching,
    data: seasonAnime,
    error,
    isError,
  } = useQuery(
    'anime',
    () => {
      return getSeasonAnimeResults();
    },
    { refetchOnWindowFocus: false }
  );

  const { data: topAiringAnime } = useQuery(
    'anime',
    () => {
      return getTopResults('anime', 'airing');
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

  if (!seasonAnime) {
    return null;
  }

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

  // console.log('airing', topAiringAnime);

  // const topAiringAnimeList = _.map(_.take(topAiringAnime, 5), (anime) => {
  //   return (
  //     <ListItem key={anime.mal_id} listStyleType="none">
  //       <Image w={75} border="1px solid #E1E7F5" fit="cover" src={article.image_url} />
  //     </ListItem>
  //   );
  // });

  return (
    <Flex justify="center" flexDir="column" mx={200} borderX="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1} mb={25}>
        Welcome to AniMan
      </Text>
      <HStack alignItems="flex-start" justifyContent="space-between" h={1500}>
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
        <VStack w={300}>
          <VStack w={300} mr={2} mt={-4}>
            <Text fontWeight="bold" mr={2} bgColor="#E1E7F5" w={300} pl={2} py={2}>
              Top Airing Anime
            </Text>
            <UnorderedList bgColor="gray.200"></UnorderedList>
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};
