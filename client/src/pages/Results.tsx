import { SearchIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AllSearch } from '../components/AllSearch';
import { Anime } from '../components/AnimeSearch';
import { Character } from '../components/CharacterSearch';
import { Manga } from '../components/MangaSearch';
import { People } from '../components/PeopleSearch';
import { useSearchContext } from '../hooks/SearchContext';

export const Results = () => {
  const history = useHistory();

  const {
    isFetching,
    data,
    error,
    isError,
    category,
    setCategory,
    currentCategory,
    query,
    setQuery,
    refetch,
  } = useSearchContext();

  if (isFetching) {
    return (
      <Flex h="100vh" justify="center">
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

  if (!data) {
    return null;
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await refetch();
    history.push(`/results?category=${category}&query=${query}`);
  };

  const categoryCheck = () => {
    if (currentCategory === 'all') {
      return 'Search All';
    } else if (currentCategory === 'anime') {
      return 'Anime Search';
    } else if (currentCategory === 'manga') {
      return 'Manga Search';
    } else if (currentCategory === 'characters') {
      return 'Character Search';
    } else if (currentCategory === 'people') {
      return 'People';
    }
  };

  const dataDisplayCheck = () => {
    if (currentCategory === 'all') {
      return (
        <AllSearch
          animeSearchResults={data.animeResults}
          mangaSearchResults={data.mangaResults}
          charactersSearchResults={data.charactersResults}
          peopleSearchResults={data.peopleResults}
        />
      );
    } else if (currentCategory === 'anime') {
      return <Anime animeSearchResults={data.animeResults} />;
    } else if (currentCategory === 'manga') {
      return <Manga mangaSearchResults={data.mangaResults} />;
    } else if (currentCategory === 'characters') {
      return <Character charactersSearchResults={data.charactersResults} />;
    } else if (currentCategory === 'people') {
      return <People peopleSearchResult={data.peopleResults} />;
    }
  };

  return (
    <Flex flexDir="column" mx={200} borderLeft="1px solid #E1E7F5" borderRight="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        {categoryCheck()}
      </Text>
      <HStack justify="center" my={10}>
        <form onSubmit={onSubmit}>
          <InputGroup size="lg" w={700}>
            <Input
              bgColor="white"
              borderRadius={5}
              placeholder="Search Anime..."
              defaultValue={query || undefined}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <InputRightElement
              children={
                <IconButton
                  size="lg"
                  aria-label="Search API"
                  icon={<SearchIcon />}
                  onClick={onSubmit}
                />
              }
            />
          </InputGroup>
        </form>
      </HStack>

      {dataDisplayCheck()}
    </Flex>
  );
};
