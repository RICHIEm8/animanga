import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  HStack,
  LinkBox,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { topResultsResponse } from '../api/api';
import { TopAnimeLists } from '../components/TopAnimeLists';
import { useSearch } from '../hooks/UseSearch';

export const TopAnime = () => {
  const { subtype, setSubtype } = useSearch();

  const { isLoading, isFetching, data, error, isError, refetch } = useQuery(
    'search',
    async () => {
      console.log('searching', subtype);
      return topResultsResponse('anime', subtype);
    },
    { refetchOnWindowFocus: false }
  );

  React.useEffect(() => {
    refetch();
  }, [subtype]);

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

  if (!data) {
    return null;
  }

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Top Anime
      </Text>
      <HStack spacing={-1} justifyContent="space-between" my={2} textAlign="center">
        <LinkBox w="16%" bgColor="#2E51A2">
          <Text color="white">All Anime</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setSubtype('airing');
          }}
        >
          <Text color="#2E51A2">Top Airing</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setSubtype('upcoming');
          }}
        >
          <Text color="#2E51A2">Top Upcoming</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setSubtype('tv');
          }}
        >
          <Text color="#2E51A2">Top TV Series</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setSubtype('movie');
          }}
        >
          <Text color="#2E51A2">Top Movies</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setSubtype('ova');
          }}
        >
          <Text color="#2E51A2">Top OVAs</Text>
        </LinkBox>
      </HStack>
      <TopAnimeLists data={data} />
    </Flex>
  );
};
