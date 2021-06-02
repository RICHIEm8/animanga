import { Flex, HStack, LinkBox, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { topResultsResponse } from '../api/api';
import { TopAiring } from '../components/TopAiring';
import { TopAnimeSeries } from '../components/TopAnimeSeries';
import { TopMovie } from '../components/TopMovie';
import { TopOva } from '../components/TopOva';
import { TopTvSeries } from '../components/TopTvSeries';
import { TopUpcoming } from '../components/TopUpcoming';
import { useTopSearch } from '../hooks/TopSearch';

export const TopAnime = () => {
  const { subtype, setSubtype } = useTopSearch();

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

  const typeCheck = () => {
    if (subtype === undefined) {
      return <TopAnimeSeries />;
    } else if (subtype === 'airing') {
      return <TopAiring />;
    } else if (subtype === 'upcoming') {
      return <TopUpcoming />;
    } else if (subtype === 'tv') {
      return <TopTvSeries />;
    } else if (subtype === 'movie') {
      return <TopMovie />;
    } else if (subtype === 'ova') {
      return <TopOva />;
    }
  };

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
      {typeCheck()}
    </Flex>
  );
};
