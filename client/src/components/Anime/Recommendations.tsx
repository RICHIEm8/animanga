import {
  Alert,
  AlertIcon,
  AlertTitle,
  ListItem,
  UnorderedList,
  Image,
  VStack,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { combinedAnimeResponse } from '../../api/api';

export const Recommendations = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);
  const { isLoading, isFetching, data, error, isError } = useQuery(
    'anime',
    () => {
      return combinedAnimeResponse('anime', parsedId);
    },
    { refetchOnWindowFocus: false }
  );

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{error}placeholder</AlertTitle>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  const { recommendations } = data;

  const recommendationsList = _.map(
    _.take(recommendations.recommendations, 20),
    (recommendation) => {
      return (
        <ListItem
          listStyleType="none"
          key={recommendation.mal_id}
          w={720}
          ml={-4}
          mt={2}
          pb={2}
          borderBottom="1px solid #E1E7F5"
        >
          <HStack alignItems="flex-start">
            <Image w={50} fit="cover" src={recommendation.image_url} />
            <VStack alignItems="flex-start">
              <Text fontSize="sm">{recommendation.title}</Text>
              <Text fontSize="xs">
                Recommended by {recommendation.recommendation_count} other people!
              </Text>
            </VStack>
          </HStack>
        </ListItem>
      );
    }
  );

  return (
    <Flex w={720} flexDir="column">
      <Text w={720} fontWeight="bold" borderBottom="1px solid #E1E7F5">
        Recommendations
      </Text>
      <UnorderedList>{recommendationsList}</UnorderedList>
    </Flex>
  );
};
