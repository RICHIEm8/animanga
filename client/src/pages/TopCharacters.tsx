import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  HStack,
  Image,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { getTopResults } from '../api/api';

export const TopCharacters = () => {
  const {
    isLoading,
    isFetching,
    data: topCharactersData,
    error,
    isError,
  } = useQuery(
    'search',
    async () => {
      return getTopResults('characters');
    },
    { refetchOnWindowFocus: false }
  );

  const topCharactersResults = _.map(topCharactersData, (character) => {
    const listOfAnime = _.map(character.animeography, (anime) => {
      return (
        <ListItem listStyleType="none" key={anime.mal_id}>
          <Text fontSize="sm" isTruncated>
            {anime.name}
          </Text>
        </ListItem>
      );
    });

    const listOfManga = _.map(character.mangaography, (manga) => {
      return (
        <ListItem listStyleType="none" key={manga.mal_id}>
          <Text fontSize="sm" isTruncated>
            {manga.name}
          </Text>
        </ListItem>
      );
    });

    return (
      <ListItem
        listStyleType="none"
        key={character.mal_id}
        ml={-16.5}
        borderBottom="1px solid #E1E7F5"
        borderX="1px solid #E1E7F5"
      >
        <HStack color="#2E51A2" spacing={0} borderX="1px solid #E1E7F5">
          <Text color="#767676" fontSize="5xl" w={92} textAlign="center">
            {character.rank}
          </Text>
          <HStack align="left" w={473} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={100} h={125} fit="cover" src={character.image_url} />
            <VStack textAlign="left" align="left" justifyContent="center" spacing={0}>
              <Text>{character.title}</Text>
              <Text color="black">({character.name_kanji})</Text>
            </VStack>
          </HStack>
          <UnorderedList w={237} px={2} borderRight="1px solid #E1E7F5" py={10}>
            {listOfAnime}
          </UnorderedList>
          <UnorderedList w={230} px={2}>
            {listOfManga}
          </UnorderedList>
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

  if (!topCharactersData) {
    return null;
  }

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Top Characters
      </Text>
      <HStack bgColor="#2E51A2" color="white" spacing={0} textAlign="center">
        <Text w={100} borderRight="1px solid #E1E7F5">
          Rank
        </Text>
        <Text w={500} borderRight="1px solid #E1E7F5">
          Character
        </Text>
        <Text w={250} borderRight="1px solid #E1E7F5">
          Animeography
        </Text>
        <Text w={250}>Mangaography</Text>
      </HStack>
      <UnorderedList>{topCharactersResults}</UnorderedList>
    </Flex>
  );
};
