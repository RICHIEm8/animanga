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
import { Anime } from '../components/Anime';
import { Manga } from '../components/Manga';
import { useSearchContext } from '../hooks/SearchContext';

export const Results = () => {
  const history = useHistory();

  const {
    isFetching,
    searchData,
    error,
    isError,
    category,
    setCategory,
    query,
    setQuery,
    refetch,
  } = useSearchContext();
  console.log('rendering', searchData);

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

  if (!searchData) {
    return null;
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await refetch();
    history.push(`/results?category=${category}&query=${query}`);
  };

  const categoryCheck = () => {
    if (category === 'all') {
      return 'Search All';
    } else if (category === 'anime') {
      return 'Anime Search';
    } else if (category === 'manga') {
      return 'Manga Search';
    }
  };

  const dataDisplayCheck = () => {
    if (category === 'anime') {
      return <Anime animeSearchResults={searchData} />;
    } else if (category === 'manga') {
      return <Manga animeSearchResults={searchData} />;
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
      <Text fontWeight="bold" borderBottom="1px" mb={2} mx={4}>
        Search Results
      </Text>
      {dataDisplayCheck()}
    </Flex>
  );
};
