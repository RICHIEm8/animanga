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
  WrapItem,
  Wrap,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { getSeasonAnimeResults, getTopResults, homePageResponse } from '../api/api';

export const Home = () => {
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

  const { seasonAnime, topAiring, topUpcoming, topPopular, animeSchedule } = data;

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

  const weeklyAnimeSchedule = () => {
    const mondaySchedule = _.map(_.take(animeSchedule.monday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    const tuesdaySchedule = _.map(_.take(animeSchedule.tuesday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    const wednesdaySchedule = _.map(_.take(animeSchedule.wednesday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    const thursdaySchedule = _.map(_.take(animeSchedule.thursday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    const fridaySchedule = _.map(_.take(animeSchedule.friday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    const saturdaySchedule = _.map(_.take(animeSchedule.saturday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    const sundaySchedule = _.map(_.take(animeSchedule.sunday, 5), (anime) => {
      return (
        <ListItem key={anime.mal_id} listStyleType="none" position="relative">
          <Image w={100} h={150} fit="cover" src={anime.image_url} />
          <Text
            w={100}
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
    return (
      <VStack spacing={0} pl={4} pr={4} alignItems="flex-start" w={720}>
        <Text fontWeight="bold">Weekly Anime Schedule</Text>
        <VStack w={720} borderTop="1px solid #E1E7F5" alignItems="flex-start">
          <Text>Monday</Text>
          <UnorderedList border="1px solid red">
            <HStack>{mondaySchedule}</HStack>
          </UnorderedList>
          <Text>Tuesday</Text>
          <UnorderedList w={720}>
            <HStack>{tuesdaySchedule}</HStack>
          </UnorderedList>
          <Text>Wednesday</Text>
          <UnorderedList w={720}>
            <HStack>{wednesdaySchedule}</HStack>
          </UnorderedList>
          <Text>Thursday</Text>
          <UnorderedList w={720}>
            <HStack>{thursdaySchedule}</HStack>
          </UnorderedList>
          <Text>Friday</Text>
          <UnorderedList w={720}>
            <HStack>{fridaySchedule}</HStack>
          </UnorderedList>
          <Text>Saturday</Text>
          <UnorderedList w={720}>
            <HStack>{saturdaySchedule}</HStack>
          </UnorderedList>
          <Text>Sunday</Text>
          <UnorderedList w={720}>
            <HStack>{sundaySchedule}</HStack>
          </UnorderedList>
        </VStack>
      </VStack>
    );
  };

  return (
    <Flex justify="center" flexDir="column" mx={200} borderX="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1} mb={25}>
        Welcome to AniMan
      </Text>
      <HStack alignItems="flex-start" minH={1500}>
        <VStack w={720} pr={2} borderRight="1px solid #E1E7F5">
          <VStack spacing={0} ml={2} alignItems="flex-start" mb={10} border="1px solid blue">
            <Text fontWeight="bold">
              {seasonAnime.season_name} {seasonAnime.season_year} Anime
            </Text>
            <UnorderedList pt={2} borderTop="1px solid #E1E7F5">
              <HStack>{currentSeasonAnimeList}</HStack>
            </UnorderedList>
          </VStack>
          {weeklyAnimeSchedule()}
        </VStack>
        <VStack w={300} alignItems="flex-start" mr={4} spacing={5}>
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
          <VStack w={300} mt={-4} mb={5} alignItems="flex-start" spacing={0}>
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
