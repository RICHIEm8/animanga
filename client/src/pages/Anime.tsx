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
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { combinedAnimeResponse } from '../api/api';

export const Anime = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);

  const { isLoading, isFetching, data, error, isError } = useQuery(
    'anime',
    () => {
      return combinedAnimeResponse('anime', parsedId);
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

  const { details, videos } = data;

  const producers = _.map(details.producers, (producer) => {
    return producer.name;
  });

  const studios = _.map(details.studios, (studio) => {
    return studio.name;
  });

  const genres = _.map(details.genres, (genre) => {
    return genre.name;
  });

  const relatedItems = _.map(details.related, (value, key) => {
    return (
      <Text borderBottom="1px solid #E1E7F5" w={720}>
        <b>{key}:</b>{' '}
        {_.map(value, (v) => {
          return v.name;
        })}
      </Text>
    );
  });

  return (
    <Flex flexDir="column" mx={200} borderX="1px solid #E1E7F5" borderBottom="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        {details.title}
      </Text>
      <HStack spacing={0} alignItems="flex-start">
        <VStack w={300} px={3} pt={2} borderRight="1px solid #E1E7F5" align="left" fontSize="sm">
          <Image w={275} fit="cover" src={details.image_url} />
          <Text borderBottom="1px solid black" fontWeight="bold">
            Alternative Titles
          </Text>
          <Text>
            <b>English:</b> {details.title_english}
          </Text>
          <Text>
            <b>Synonym:</b> {details.title_synonyms.join(', ')}
          </Text>
          <Text>
            <b>Japanese:</b> {details.title_japanese}
          </Text>
          <Text borderBottom="1px solid black" fontWeight="bold">
            Information
          </Text>
          <Text>
            <b>Type:</b> {details.type}
          </Text>
          <Text>
            <b>Episodes:</b> {details.episodes}
          </Text>
          <Text>
            <b>Status:</b> {details.status}
          </Text>
          <Text>
            <b>Premiered:</b> {details.premiered}
          </Text>
          <Text>
            <b>Producers:</b> {producers.join(', ')}
          </Text>
          <Text>
            <b>Studios:</b> {studios.join(', ')}
          </Text>
          <Text>
            <b>Sources:</b> {details.source}
          </Text>
          <Text>
            <b>Genres:</b> {genres.join(', ')}
          </Text>
          <Text>
            <b>Duration:</b> {details.duration}
          </Text>
          <Text>
            <b>Rating:</b> {details.rating}
          </Text>
          <Text borderBottom="1px solid black" fontWeight="bold">
            Statistics
          </Text>
          <Text>
            <b>Score:</b> {details.score}
          </Text>
          <Text>
            <b>Ranked:</b> {details.rank}
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
          <HStack justifyContent="space-between" alignItems="flex-start">
            <HStack justifyContent="flex-start" spacing={8} bgColor="#ECF2FF" w={412}>
              <VStack borderRight="1px solid black" px={2} py={2} my={2}>
                <Text mb={-3} bgColor="#2E51A2" color="white" px={5} borderRadius={5}>
                  Score
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {details.score}
                </Text>
                <Text fontSize="xs">
                  Ranked #<b>{details.rank}</b>
                </Text>
              </VStack>
              <HStack justifyContent="space-between" spacing={5}>
                <Text borderRight="1px solid black" pr={5}>
                  {details.premiered}
                </Text>
                <Text borderRight="1px solid black" pr={5}>
                  {details.type}
                </Text>
                <Text>{studios.join(', ')}</Text>
              </HStack>
            </HStack>
            <AspectRatio w={300}>
              <iframe
                title={`${details.title} promo vid`}
                src={_.replace(videos.promo[0].video_url, 'autoplay=1', 'autoplay=0')}
                allowFullScreen
              />
            </AspectRatio>
          </HStack>
          <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
            Synopsis
          </Text>
          <Text w={720}>{details.synopsis}</Text>
          <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
            Related Anime
          </Text>
          {relatedItems}
          <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
            Characters and Voice Actors
          </Text>
          <UnorderedList></UnorderedList>
          <HStack w={720} justifyContent="space-between" pt={2}>
            <VStack>
              <Text fontWeight="bold" borderBottom="1px solid black" w={360}>
                Opening Theme
              </Text>
            </VStack>
            <VStack>
              <Text fontWeight="bold" borderBottom="1px solid black" w={350}>
                Ending Theme
              </Text>
            </VStack>
          </HStack>
          <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
            Reviews
          </Text>
          <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
            News
          </Text>
          <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
            Recommendations
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};
