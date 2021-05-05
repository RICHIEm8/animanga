import _ from 'lodash';
import react from 'react';
import { AnimeResult, animeResults, CharactersResult } from '../api/api';
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
  charactersSearchResults: CharactersResult[];
}

export const Character = (props: Props) => {
  const { charactersSearchResults } = props;

  const charactersResults = _.map(charactersSearchResults, (character) => {
    const altNames = !_.isEmpty(character.alternative_names) ? (
      <Text fontSize="xs">({_.join(character.alternative_names, ', ')})</Text>
    ) : null;

    const animeNames = _.map(character.anime, (anime) => {
      return anime.name;
    });

    return (
      <ListItem listStyleType="none" key={character.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack>
          <Image w={75} h={100} fit="cover" src={character.image_url} />
          <VStack align="left">
            <Heading size="xs">{character.name}</Heading>
            {altNames}
          </VStack>
          <VStack>
            <Text whiteSpace="pre-wrap">{_.join(animeNames, '\n')}</Text>
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return <UnorderedList>{charactersResults}</UnorderedList>;
};
