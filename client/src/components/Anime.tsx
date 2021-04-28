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
      }
    };

    return (
      <ListItem listStyleType="none" key={anime.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack align="left" spacing={3}>
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
              {anime.episodes}
            </Text>
            <Text w={45} align="center">
              {anime.score}
            </Text>
          </HStack>
        </HStack>
      </ListItem>
    );
  });

  return <UnorderedList>{animeResults}</UnorderedList>;
};
