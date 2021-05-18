import {
  Button,
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
import { useHistory } from 'react-router-dom';
import { AnimeResult, CharactersResult, MangaResult, PeopleResult } from '../api/api';
import { useSearch } from '../hooks/UseSearch';

interface Props {
  animeSearchResults: AnimeResult[];
  mangaSearchResults: MangaResult[];
  charactersSearchResults: CharactersResult[];
  peopleSearchResults: PeopleResult[];
}

export const AllSearch = (props: Props) => {
  const history = useHistory();

  const { query } = useSearch();

  const { animeSearchResults, mangaSearchResults, charactersSearchResults, peopleSearchResults } =
    props;

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
            <Link>
              <Heading color="#2E51A2" size="xs" align="left">
                {anime.title}
              </Heading>
            </Link>

            <Text w={690} align="left">
              {anime.synopsis}
            </Text>
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
            <Link>
              <Heading color="#2E51A2" align="left" size="xs">
                {manga.title}
              </Heading>
            </Link>

            <Text align="left" w={700}>
              {manga.synopsis}
            </Text>
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
      <Text align="left" fontSize="xs">
        ({_.join(character.alternative_names, ', ')})
      </Text>
    ) : null;

    const animeNames = _.map(character.anime, (anime) => {
      return anime.name;
    });

    const mangaNames = _.map(character.manga, (manga) => {
      return manga.name;
    });

    const animeCheck = !_.isEmpty(character.anime) ? (
      <Text align="left" fontSize="xs" w={800}>
        <b>Anime:</b> {_.join(animeNames, ', ')}
      </Text>
    ) : null;

    const mangaCheck = !_.isEmpty(character.manga) ? (
      <Text align="left" fontSize="xs" w={800}>
        <b>Manga:</b> {_.join(mangaNames, ', ')}
      </Text>
    ) : null;

    return (
      <ListItem listStyleType="none" key={character.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack>
          <HStack w={200}>
            <Image w={75} h={100} fit="cover" src={character.image_url} />
            <VStack align="left">
              <Link>
                <Heading color="#2E51A2" align="left" size="xs">
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

  const peopleResult = _.map(peopleSearchResults, (people) => {
    const altNames = !_.isEmpty(people.alternative_names) ? (
      <Text align="left" fontSize="xs">
        ({_.join(people.alternative_names, ', ')})
      </Text>
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
            <Link>
              <Heading color="#2E51A2" align="left" size="xs">
                {people.name}
              </Heading>
            </Link>

            {altNames}
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <VStack>
      <Text bgColor="#2E51A2" color="white" fontWeight="bold" width={997} align="center">
        Search Results for "{query}"
      </Text>
      <UnorderedList align="center">
        <Text align="left" fontSize="xl" fontWeight="bold" borderBottom="1px" my={2}>
          Anime
        </Text>
        <HStack w={1000} bgColor="#E1E7F5" spacing={5} pr={2} py={1}>
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
        <Button
          onClick={async (e: any) => {
            e.preventDefault();

            history.push(`/results?category=anime&query=${query}`);
          }}
          mt={2}
          bgColor="#2E51A2"
          color="white"
          fontWeight="bold"
        >
          Search for "{query}" in Anime
        </Button>
      </UnorderedList>
      <UnorderedList align="center">
        <Text align="left" fontSize="xl" fontWeight="bold" borderBottom="1px" my={2}>
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
        <Button
          onClick={async (e: any) => {
            e.preventDefault();

            history.push(`/results?category=manga&query=${query}`);
          }}
          mt={2}
          bgColor="#2E51A2"
          color="white"
          fontWeight="bold"
        >
          Search for "{query}" in Manga
        </Button>
      </UnorderedList>
      <UnorderedList align="center">
        <Text align="left" fontSize="xl" fontWeight="bold" borderBottom="1px" my={2}>
          Characters
        </Text>
        {charactersResults}
        <Button
          onClick={async (e: any) => {
            e.preventDefault();

            history.push(`/results?category=characters&query=${query}`);
          }}
          mt={2}
          bgColor="#2E51A2"
          color="white"
          fontWeight="bold"
        >
          Search for "{query}" in Characters
        </Button>
      </UnorderedList>
      <UnorderedList align="center">
        <Text align="left" fontSize="xl" fontWeight="bold" borderBottom="1px" mb={2}>
          People
        </Text>
        {peopleResult}
        <Button
          onClick={async (e: any) => {
            e.preventDefault();
            history.push(`/results?category=people&query=${query}`);
          }}
          mt={2}
          bgColor="#2E51A2"
          color="white"
          fontWeight="bold"
        >
          Search for "{query}" in People
        </Button>
      </UnorderedList>
    </VStack>
  );
};
