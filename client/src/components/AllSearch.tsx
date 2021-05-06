import { Heading, HStack, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { AnimeResult, CharactersResult, MangaResult, PeopleResult } from '../api/api';

interface Props {
  animeSearchResults: AnimeResult[];
  mangaSearchResults: MangaResult[];
  charactersSearchResults: CharactersResult[];
  peopleSearchResults: PeopleResult[];
}

export const AllSearch = (props: Props) => {
  const {
    animeSearchResults,
    mangaSearchResults,
    charactersSearchResults,
    peopleSearchResults,
  } = props;

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
        <HStack align="left" spacing={2}>
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
        <HStack>
          <HStack w={200}>
            <Image w={75} h={100} fit="cover" src={character.image_url} />
            <VStack align="left">
              <Heading size="xs">{character.name}</Heading>
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

  const peopleResult = _.map(peopleSearchResults, (people) => {
    const altNames = !_.isEmpty(people.alternative_names) ? (
      <Text fontSize="xs">({_.join(people.alternative_names, ', ')})</Text>
    ) : null;

    return (
      <ListItem
        listStyleType="none"
        key={people.mal_id}
        py={2}
        borderBottom="1px solid #E1E7F5"
        w={1007}
      >
        <HStack>
          <Image w={75} h={100} fit="cover" src={people.image_url} />
          <VStack align="left">
            <Heading size="xs">{people.name}</Heading>
            {altNames}
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <VStack>
      <UnorderedList>
        <Text fontSize="xl" fontWeight="bold" borderBottom="1px" mb={2} mr={4}>
          Anime
        </Text>
        <HStack w={1007} bgColor="#E1E7F5" spacing={5} pr={2} py={1} mr={4}>
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
      <UnorderedList>
        <Text fontSize="xl" fontWeight="bold" borderBottom="1px" my={2}>
          Manga
        </Text>
        <HStack w={1000} bgColor="#E1E7F5" spacing={5} pr={2} py={1}>
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
      <UnorderedList>
        <Text fontSize="xl" fontWeight="bold" borderBottom="1px" my={2}>
          Characters
        </Text>
        {charactersResults}
      </UnorderedList>
      <UnorderedList>
        <Text fontSize="xl" fontWeight="bold" borderBottom="1px" mb={2}>
          People
        </Text>
        {peopleResult}
      </UnorderedList>
    </VStack>
  );
};
