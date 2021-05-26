import { StarIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Flex,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  Image,
  VStack,
  Link,
  Heading,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { topMangaResultsData } from '../api/api';

export const TopManga = () => {
  const {
    isLoading,
    isFetching,
    data: topMangaData,
    error,
    isError,
  } = useQuery(
    'search',
    async () => {
      return topMangaResultsData();
    },
    { refetchOnWindowFocus: false }
  );

  const topMangaResults = _.map(topMangaData, (manga, index) => {
    const chptCheck = () => {
      if (manga.chapters === 0) {
        return '(? chpts)';
      } else {
        return `(${manga.chapters} chpts)`;
      }
    };

    const airingDate = () => {
      let startDate = new Date(manga.start_date).toDateString().split(' ');
      let endDate = new Date(manga.end_date).toDateString().split(' ');

      let fixedStartDate = _.remove(startDate, (_v, i) => i === 1 || i === 3).join(' ');
      let fixedEndDate = _.remove(endDate, (_v, i) => i === 1 || i === 3).join(' ');

      if (manga.publishing === true) {
        return <Text>{fixedStartDate} -</Text>;
      } else
        return (
          <Text>
            {fixedStartDate} - {fixedEndDate}
          </Text>
        );
    };

    return (
      <ListItem
        listStyleType="none"
        key={manga.mal_id}
        ml={-16.5}
        borderBottom="1px solid #E1E7F5"
        borderX="1px solid #E1E7F5"
      >
        <HStack color="#2E51A2" spacing={0} textAlign="center">
          <Text color="#767676" fontSize="6xl" w={200}>
            {_.toString(index + 1)}
          </Text>
          <HStack align="left" w={700} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={75} h={100} fit="cover" src={manga.image_url} />
            <VStack textAlign="left" align="left">
              <Link>
                <Heading color="#2E51A2" size="md">
                  {manga.title}
                </Heading>
              </Link>
              <Text>
                {manga.type} {chptCheck()}
              </Text>
              {airingDate()}
            </VStack>
          </HStack>
          <HStack w={200} justifyContent="center">
            <StarIcon boxSize={5} color="#DDCC00" />
            <Text fontSize="2xl" w={65} align="left" color="black">
              {manga.score}
            </Text>
          </HStack>
        </HStack>
      </ListItem>
    );
  });

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

  if (!topMangaData) {
    return null;
  }

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Top Manga
      </Text>
      <HStack bgColor="#2E51A2" color="white" spacing={0} textAlign="center">
        <Text w={200} borderRight="1px solid #E1E7F5">
          Rank
        </Text>
        <Text w={700} borderRight="1px solid #E1E7F5">
          Title
        </Text>
        <Text w={200}>Score</Text>
      </HStack>
      <UnorderedList>{topMangaResults}</UnorderedList>
    </Flex>
  );
};
