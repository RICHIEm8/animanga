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
import { AnimeRecommendationsResponse, combinedAnimeResponse } from '../../api/api';

interface Props {
  recommendations: AnimeRecommendationsResponse;
}

export const Recommendations = (props: Props) => {
  const { recommendations } = props;

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