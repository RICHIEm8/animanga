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
  LinkBox,
  Box,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { topResultsResponse } from '../api/api';

export const TopAnimeSeries = () => {
  const {
    isLoading,
    isFetching,
    data: topAnimeData,
    error,
    isError,
  } = useQuery(
    'search',
    async () => {
      return topResultsResponse('anime', 'favorite');
    },
    { refetchOnWindowFocus: false }
  );

  const topAnimeResults = _.map(topAnimeData, (anime) => {
    const epsCheck = () => {
      if (_.isNull(anime.episodes)) {
        return '(? eps)';
      } else {
        return `(${anime.episodes} eps)`;
      }
    };

    const airingDate = () => {
      if (_.isNull(anime.end_date)) {
        return <Text>{anime.start_date} -</Text>;
      } else
        return (
          <Text>
            {anime.start_date} - {anime.end_date}
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
          <Text color="#767676" fontSize="6xl" w={200}>
            {_.toString(anime.rank)}
          </Text>
          <HStack align="left" w={700} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={75} h={100} fit="cover" src={anime.image_url} />
            <VStack textAlign="left" align="left">
              <Link>
                <Heading color="#2E51A2" size="md">
                  {anime.title}
                </Heading>
              </Link>
              <Text>
                {anime.type} {epsCheck()}
              </Text>
              {airingDate()}
            </VStack>
          </HStack>
          <HStack w={200} justifyContent="center">
            <StarIcon boxSize={5} color="#DDCC00" />
            <Text fontSize="2xl" w={65} align="left" color="black">
              {anime.score}
            </Text>
          </HStack>
        </HStack>
      </ListItem>
    );
  });

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

  if (!topAnimeData) {
    return null;
  }

  return (
    <Box>
      <Heading size="md" mb={2}>
        Top Anime Series
      </Heading>
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
    </Box>
  );
};
