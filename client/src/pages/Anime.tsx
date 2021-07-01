import {
  Alert,
  AlertIcon,
  AlertTitle,
  AspectRatio,
  Box,
  Flex,
  HStack,
  Image,
  ListItem,
  Spacer,
  Spinner,
  Text,
  UnorderedList,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { combinedAnimeResponse } from '../api/api';
import { CharactersStaff } from '../components/Anime/CharactersStaff';
import { Details } from '../components/Anime/Details';
import { News } from '../components/Anime/News';
import { Pictures } from '../components/Anime/Pictures';
import { Recommendations } from '../components/Anime/Recommendations';
import { Reviews } from '../components/Anime/Reviews';
import { SideInfo } from '../components/Anime/SideInfo';
import { Videos } from '../components/Anime/Videos';

export const Anime = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);
  const [infoType, setInfoType] = useState('details');

  const { isLoading, isFetching, data, error, isError } = useQuery(
    'anime',
    () => {
      return combinedAnimeResponse('anime', parsedId);
    },
    { refetchOnWindowFocus: false }
  );

  // if (isLoading || isFetching) {
  //   return (
  //     <Flex h="100vh" justify="center" mt={50}>
  //       <Spinner color="blue" />
  //     </Flex>
  //   );
  // }

  if (isError) {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
    </Alert>;
  }

  if (!data) {
    return null;
  }

  const { details, videos, pictures, charactersStaff, reviews, news, recommendations } = data;

  console.log(infoType);

  const infoTabDisplay = () => {
    if (infoType === 'details') {
      return (
        <Details
          details={details}
          charactersStaff={charactersStaff}
          reviews={reviews}
          news={news}
          videos={videos}
          recommendations={recommendations}
        />
      );
    } else if (infoType === 'charactersStaff') {
      return <CharactersStaff charactersStaff={charactersStaff} />;
    } else if (infoType === 'reviews') {
      return <Reviews reviews={reviews} />;
    } else if (infoType === 'recommendations') {
      return <Recommendations recommendations={recommendations} />;
    } else if (infoType === 'news') {
      return <News news={news} />;
    } else if (infoType === 'pictures') {
      return <Pictures pictures={pictures} />;
    } else if (infoType === 'videos') {
      return <Videos videos={videos} />;
    } else {
      return null;
    }
  };

  return (
    <Flex flexDir="column" mx={200} borderX="1px solid #E1E7F5" borderBottom="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        {details.title}
      </Text>
      <HStack spacing={0} alignItems="flex-start">
        <SideInfo details={details} />
        <VStack w={740} alignItems="flex-start" pl={2} borderLeft="1px solid #E1E7F5">
          <HStack
            w={720}
            justifyContent="space-between"
            textAlign="center"
            my={2}
            px={2}
            spacing={-5}
            borderBottom="1px solid black"
            color="#2E51A2"
          >
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('details');
              }}
            >
              <Text mx={2}>Details</Text>
            </Box>
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('charactersStaff');
              }}
            >
              <Text mx={2}>Characters & Staff</Text>
            </Box>
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('reviews');
              }}
            >
              <Text mx={2}>Reviews</Text>
            </Box>
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('recommendations');
              }}
            >
              <Text mx={2}>Recommendations</Text>
            </Box>
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('news');
              }}
            >
              <Text mx={2}>News</Text>
            </Box>
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('videos');
              }}
            >
              <Text mx={2}>Videos</Text>
            </Box>
            <Box
              _hover={{ bg: '#2E51A2', color: 'white' }}
              onClick={() => {
                setInfoType('pictures');
              }}
            >
              <Text mx={2}>Pictures</Text>
            </Box>
          </HStack>
          {infoTabDisplay()}
        </VStack>
      </HStack>
    </Flex>
  );
};
