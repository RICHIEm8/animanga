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
import { Anime } from '../components/Anime';
import { useSearchContext } from '../hooks/SearchContext';

export const Results = () => {
  const { isFetching, searchData, error, isError } = useSearchContext();
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

  return (
    <Flex flexDir="column" mx={200} borderLeft="1px solid #E1E7F5" borderRight="1px solid #E1E7F5">
      <HStack justify="center" my={10}>
        <InputGroup size="lg" w={700}>
          <Input bgColor="white" borderRadius={5} placeholder="Search Anime..." />
          <InputRightElement
            children={<IconButton size="lg" aria-label="Search API" icon={<SearchIcon />} />}
          />
        </InputGroup>
      </HStack>
      <Text fontWeight="bold" borderBottom="1px" mb={2} pl={2}>
        Search Results
      </Text>
      <Flex>
        <HStack bgColor="#E1E7F5" spacing={5} pr={2} py={1}>
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
      </Flex>
      <Anime animeSearchResults={searchData} />
    </Flex>
  );
};
