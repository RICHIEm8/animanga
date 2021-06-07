import {
  Alert,
  AlertIcon,
  AlertTitle,
  AspectRatio,
  Box,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { singleResultResponse } from '../api/api';

export const Anime = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);

  const {
    isLoading,
    isFetching,
    data: anime,
    error,
    isError,
  } = useQuery(
    'anime',
    () => {
      return singleResultResponse('anime', parsedId);
    },
    { refetchOnWindowFocus: false }
  );

  const { data: animeVideos } = useQuery('video', () => {
    return singleResultResponse('anime', parsedId, 'videos');
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

  if (!anime) {
    return null;
  }

  const producers = _.map(anime.producers, (producer) => {
    return producer.name;
  });

  const studios = _.map(anime.studios, (studio) => {
    return studio.name;
  });

  const genres = _.map(anime.genres, (genre) => {
    return genre.name;
  });

  console.log(animeVideos.promo[0].video_url);

  return (
    <Flex flexDir="column" mx={200} borderX="1px solid #E1E7F5" borderBottom="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        {anime.title}
      </Text>
      <HStack spacing={0} alignItems="flex-start">
        <VStack w={300} px={3} pt={2} borderRight="1px solid #E1E7F5" align="left" fontSize="sm">
          <Image w={275} fit="cover" src={anime.image_url} />
          <Text borderBottom="1px solid black" fontWeight="bold">
            Alternative Titles
          </Text>
          <Text>
            <b>English:</b> {anime.title_english}
          </Text>
          <Text>
            <b>Synonym:</b> {anime.title_synonyms.join(', ')}
          </Text>
          <Text>
            <b>Japanese:</b> {anime.title_japanese}
          </Text>
          <Text borderBottom="1px solid black" fontWeight="bold">
            Information
          </Text>
          <Text>
            <b>Type:</b> {anime.type}
          </Text>
          <Text>
            <b>Episodes:</b> {anime.episodes}
          </Text>
          <Text>
            <b>Status:</b> {anime.status}
          </Text>
          <Text>
            <b>Premiered:</b> {anime.premiered}
          </Text>
          <Text>
            <b>Producers:</b> {producers.join(', ')}
          </Text>
          <Text>
            <b>Studios:</b> {studios.join(', ')}
          </Text>
          <Text>
            <b>Sources:</b> {anime.source}
          </Text>
          <Text>
            <b>Genres:</b> {genres.join(', ')}
          </Text>
          <Text>
            <b>Duration:</b> {anime.duration}
          </Text>
          <Text>
            <b>Rating:</b> {anime.rating}
          </Text>
          <Text borderBottom="1px solid black" fontWeight="bold">
            Statistics
          </Text>
          <Text>
            <b>Score:</b> {anime.score}
          </Text>
          <Text>
            <b>Ranked:</b> {anime.rank}
          </Text>
        </VStack>
        <VStack w={740} alignItems="flex-start" pl={2}>
          <HStack
            w={720}
            justifyContent="space-between"
            textAlign="center"
            my={2}
            px={2}
            borderBottom="1px solid black"
            color="#2E51A2"
          >
            <Box>
              <Text>Details</Text>
            </Box>
            <Box>
              <Text>Characters & Staff</Text>
            </Box>
            <Box>
              <Text>Reviews</Text>
            </Box>
            <Box>
              <Text>Recommendations</Text>
            </Box>
            <Box>
              <Text>News</Text>
            </Box>
            <Box>
              <Text>Videos</Text>
            </Box>
            <Box>
              <Text>Pictures</Text>
            </Box>
          </HStack>
          <HStack justifyContent="center" bgColor="#ECF2FF">
            <VStack borderRight="1px solid black" px={2} py={2} my={2}>
              <Text mb={-3} bgColor="#2E51A2" color="white" px={5} borderRadius={5}>
                Score
              </Text>
              <Text fontSize="2xl" fontWeight="bold">
                {anime.score}
              </Text>
              <Text fontSize="xs">
                Ranked #<b>{anime.rank}</b>
              </Text>
            </VStack>
            <Text borderRight="1px solid black" pr={2}>
              {anime.premiered}
            </Text>
            <Text borderRight="1px solid black" pr={2}>
              {anime.type}
            </Text>
            <Text>{studios.join(', ')}</Text>
          </HStack>
          <Box>
            <AspectRatio>
              <iframe
                title={`${anime.title} promo vid`}
                // src={animeVideos.promo[0].video_url}
                src="https://www.youtube.com/embed/--IcmZkvL0Q?enablejsapi=1&wmode=opaque&autoplay=1"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        </VStack>
      </HStack>
    </Flex>
  );
};
