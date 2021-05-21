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
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  AnimeResult,
  animeResults,
  CharactersResult,
  charactersResults,
  MangaResult,
  mangaResults,
  PeopleResult,
  peopleResults,
} from '../api/api';
import { AllSearch } from '../components/AllSearch';
import { Anime } from '../components/AnimeSearch';
import { Character } from '../components/CharacterSearch';
import { Manga } from '../components/MangaSearch';
import { People } from '../components/PeopleSearch';
import { useSearch } from '../hooks/UseSearch';

export interface AllSearchResult {
  animeResults: AnimeResult[];
  mangaResults: MangaResult[];
  charactersResults: CharactersResult[];
  peopleResults: PeopleResult[];
}

const doSearch = async (
  category: string | undefined | null,
  query: string | undefined | null
): Promise<AllSearchResult> => {
  if (_.isNil(query)) {
    return {
      animeResults: [],
      mangaResults: [],
      charactersResults: [],
      peopleResults: [],
    };
  } else if (category === 'all') {
    return {
      animeResults: await animeResults(query),
      mangaResults: await mangaResults(query),
      charactersResults: await charactersResults(query),
      peopleResults: await peopleResults(query),
    };
  } else if (category === 'anime') {
    return {
      animeResults: await animeResults(query),
      mangaResults: [],
      charactersResults: [],
      peopleResults: [],
    };
  } else if (category === 'manga') {
    return {
      animeResults: [],
      mangaResults: await mangaResults(query),
      charactersResults: [],
      peopleResults: [],
    };
  } else if (category === 'characters') {
    return {
      animeResults: [],
      mangaResults: [],
      charactersResults: await charactersResults(query),
      peopleResults: [],
    };
  } else if (category === 'people') {
    return {
      animeResults: [],
      mangaResults: [],
      charactersResults: [],
      peopleResults: await peopleResults(query),
    };
  }
  return {
    animeResults: [],
    mangaResults: [],
    charactersResults: [],
    peopleResults: [],
  };
};

export const Results = () => {
  const history = useHistory();

  const { category, query, currentQuery, setCurrentQuery } = useSearch();

  const { isLoading, isFetching, data, error, isError, refetch } = useQuery(
    'search',
    async () => {
      return doSearch(category, query);
    },
    { enabled: false }
  );

  React.useEffect(() => {
    refetch();
  }, [query, category]);

  if (isLoading || isFetching) {
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
    history.push(`/results?category=${category}&query=${currentQuery}`);
  };

  const categoryCheck = () => {
    if (category === 'all') {
      return 'Search All';
    } else if (category === 'anime') {
      return 'Anime Search';
    } else if (category === 'manga') {
      return 'Manga Search';
    } else if (category === 'characters') {
      return 'Character Search';
    } else if (category === 'people') {
      return 'People Search';
    }
  };

  const dataDisplayCheck = () => {
    if (category === 'all') {
      return (
        <AllSearch
          animeSearchResults={data.animeResults}
          mangaSearchResults={data.mangaResults}
          charactersSearchResults={data.charactersResults}
          peopleSearchResults={data.peopleResults}
        />
      );
    } else if (category === 'anime') {
      return <Anime animeSearchResults={data.animeResults} />;
    } else if (category === 'manga') {
      return <Manga mangaSearchResults={data.mangaResults} />;
    } else if (category === 'characters') {
      return <Character charactersSearchResults={data.charactersResults} />;
    } else if (category === 'people') {
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
                setCurrentQuery(e.target.value);
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
