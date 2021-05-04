import _ from 'lodash';
import react from 'react';
import { AnimeResult } from '../api/api';
import {
  Avatar,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Image,
  Heading,
  VStack,
  HStack,
  Box,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  animeSearchResults: AnimeResult[];
}

export const Anime = (props: Props) => {
  const { animeSearchResults } = props;

  const animeResults = _.map(animeSearchResults, (anime) => {
    const epCheck = () => {
      if (anime.episodes === 0) {
        return '-';
      } else {
        return anime.episodes;
      }
    };

    const scoreCheck = () => {
      if (anime.score === 0) {
        return '-';
      } else {
        return anime.score;
      }
    };

    return (
      <ListItem listStyleType="none" key={anime.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack align="left" spacing={1.5}>
          <Image w={75} h={100} fit="cover" src={anime.image_url} />
          <VStack align="left">
            <Heading size="xs">{anime.title}</Heading>
            <Text w={700}>{anime.synopsis}</Text>
          </VStack>
          <HStack spacing={6}>
            <Text w={68} align="center">
              {anime.type}
            </Text>
            <Text w={45} align="center">
              {epCheck()}
            </Text>
            <Text w={45} align="center">
              {scoreCheck()}
            </Text>
          </HStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <UnorderedList>
      <HStack w={1007} bgColor="#E1E7F5" spacing={5} pr={2} py={1}>
        <Text fontWeight="bold" w={805} align="center">
          Title
        </Text>
        <Text fontWeight="bold" align="center" w={55}>
          Type
        </Text>
        <Text fontWeight="bold" align="center" w={55}>
          Eps.
        </Text>
        <Text fontWeight="bold" align="center" w={55}>
          Score
        </Text>
      </HStack>
      {animeResults}
    </UnorderedList>
  );
};
