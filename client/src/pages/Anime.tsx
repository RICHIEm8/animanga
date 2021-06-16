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
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { combinedAnimeResponse } from '../api/api';
import { Details } from '../components/Anime/Details';
import { SideInfo } from '../components/Anime/SideInfo';

export const Anime = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);

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

  const { details } = data;

  return (
    <Flex flexDir="column" mx={200} borderX="1px solid #E1E7F5" borderBottom="1px solid #E1E7F5">
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        {details.title}
      </Text>
      <HStack spacing={0} alignItems="flex-start">
        <SideInfo />
        <VStack w={740} alignItems="flex-start" pl={2} borderLeft="1px solid #E1E7F5">
          <HStack
            w={720}
            justifyContent="space-between"
            textAlign="center"
            my={2}
            px={2}
            borderBottom="1px solid black"
            color="#2E51A2"
          >
            <Box>
              <Text>Details</Text>
            </Box>
            <Box>
              <Text>Characters & Staff</Text>
            </Box>
            <Box>
              <Text>Reviews</Text>
            </Box>
            <Box>
              <Text>Recommendations</Text>
            </Box>
            <Box>
              <Text>News</Text>
            </Box>
            <Box>
              <Text>Videos</Text>
            </Box>
            <Box>
              <Text>Pictures</Text>
            </Box>
          </HStack>
          <Details />
        </VStack>
      </HStack>
    </Flex>
  );
};
