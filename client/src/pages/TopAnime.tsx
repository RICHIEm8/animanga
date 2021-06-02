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

export const TopAnime = () => {
  const [type, setType] = useState('');

  const typeCheck = () => {
    if (type === '') {
      return <TopAnimeSeries />;
    } else if (type === 'airing') {
      return <TopAiring />;
    } else if (type === 'upcoming') {
      return <TopUpcoming />;
    } else if (type === 'tv') {
      return <TopTvSeries />;
    } else if (type === 'movie') {
      return <TopMovie />;
    } else if (type === 'ova') {
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
            setType('airing');
          }}
        >
          <Text color="#2E51A2">Top Airing</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setType('upcoming');
          }}
        >
          <Text color="#2E51A2">Top Upcoming</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setType('tv');
          }}
        >
          <Text color="#2E51A2">Top TV Series</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setType('movie');
          }}
        >
          <Text color="#2E51A2">Top Movies</Text>
        </LinkBox>
        <LinkBox
          w="16%"
          onClick={() => {
            setType('ova');
          }}
        >
          <Text color="#2E51A2">Top OVAs</Text>
        </LinkBox>
      </HStack>
      {typeCheck()}
    </Flex>
  );
};
