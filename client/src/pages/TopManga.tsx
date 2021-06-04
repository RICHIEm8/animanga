import { Alert, AlertIcon, AlertTitle, Box, Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { topResultsResponse } from '../api/api';
import { TopMangaLists } from '../components/TopMangaLists';
import { useSearch } from '../hooks/UseSearch';

export const TopManga = () => {
  const { subtype, setSubtype } = useSearch();

  const { isLoading, isFetching, data, error, isError, refetch } = useQuery(
    'search',
    async () => {
      return topResultsResponse('manga', subtype);
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
        Top Manga
      </Text>
      <HStack spacing={-1} justifyContent="space-between" my={2} textAlign="center">
        <Box
          w="16%"
          onClick={() => {
            setSubtype(undefined);
          }}
        >
          <Text color="#2E51A2" _hover={{ bg: '#2E51A2', color: 'white' }}>
            All Manga
          </Text>
        </Box>
        <Box
          w="16%"
          onClick={() => {
            setSubtype('manga');
          }}
        >
          <Text color="#2E51A2" _hover={{ bg: '#2E51A2', color: 'white' }}>
            Top Manga
          </Text>
        </Box>
        <Box
          w="16%"
          onClick={() => {
            setSubtype('oneshots');
          }}
        >
          <Text color="#2E51A2" _hover={{ bg: '#2E51A2', color: 'white' }}>
            Top One-Shots
          </Text>
        </Box>
        <Box
          w="16%"
          onClick={() => {
            setSubtype('novels');
          }}
        >
          <Text color="#2E51A2" _hover={{ bg: '#2E51A2', color: 'white' }}>
            Top Novels
          </Text>
        </Box>
        <Box
          w="16%"
          onClick={() => {
            setSubtype('manhwa');
          }}
        >
          <Text color="#2E51A2" _hover={{ bg: '#2E51A2', color: 'white' }}>
            Top Manhwa
          </Text>
        </Box>
        <Box
          w="16%"
          onClick={() => {
            setSubtype('manhua');
          }}
        >
          <Text color="#2E51A2" _hover={{ bg: '#2E51A2', color: 'white' }}>
            Top Manhua
          </Text>
        </Box>
      </HStack>
      <TopMangaLists data={data} />
    </Flex>
  );
};
