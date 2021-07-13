import {
  Heading,
  HStack,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { CharactersResultResponse } from '../api/api';

interface Props {
  charactersSearchResults: CharactersResultResponse[];
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

    const mangaNames = _.map(character.manga, (manga) => {
      return manga.name;
    });

    const animeCheck = !_.isEmpty(character.anime) ? (
      <Text fontSize="xs" w={800}>
        <b>Anime:</b> {_.join(animeNames, ', ')}
      </Text>
    ) : null;

    const mangaCheck = !_.isEmpty(character.manga) ? (
      <Text fontSize="xs" w={800}>
        <b>Manga:</b> {_.join(mangaNames, ', ')}
      </Text>
    ) : null;

    return (
      <ListItem listStyleType="none" key={character.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack mr={4}>
          <HStack w={200}>
            <Image w={75} h={100} fit="cover" src={character.image_url} />
            <VStack align="left">
              <Link>
                <Heading color="#2E51A2" size="xs">
                  {character.name}
                </Heading>
              </Link>

              {altNames}
            </VStack>
          </HStack>
          <VStack>
            {animeCheck}
            {mangaCheck}
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <UnorderedList>
      <Text fontWeight="bold" borderBottom="1px" mb={2} mr={4}>
        Top Characters
      </Text>
      {charactersResults}
    </UnorderedList>
  );
};
