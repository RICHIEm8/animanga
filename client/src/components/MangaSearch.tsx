import _ from 'lodash';
import react from 'react';
import { MangaResult } from '../api/api';
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
  mangaSearchResults: MangaResult[];
}

export const Manga = (props: Props) => {
  const { mangaSearchResults } = props;

  const mangaResults = _.map(mangaSearchResults, (manga) => {
    const chptCheck = () => {
      if (manga.chapters === 0) {
        return '-';
      } else {
        return manga.chapters;
      }
    };

    const scoreCheck = () => {
      if (manga.score === 0) {
        return '-';
      } else {
        return manga.score;
      }
    };

    return (
      <ListItem listStyleType="none" key={manga.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack align="left" spacing={2}>
          <Image w={75} h={100} fit="cover" src={manga.image_url} />
          <VStack align="left">
            <Heading size="xs">{manga.title}</Heading>
            <Text w={700}>{manga.synopsis}</Text>
          </VStack>
          <HStack spacing={6}>
            <Text w={68} align="center">
              {manga.type}
            </Text>
            <Text w={45} align="center">
              {chptCheck()}
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
          Chpts.
        </Text>
        <Text fontWeight="bold" align="center" w={55}>
          Score
        </Text>
      </HStack>
      {mangaResults}
    </UnorderedList>
  );
};
