import { Alert, AlertIcon, AlertTitle, Flex, Spinner, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { singleResultResponse } from '../api/api';

export const Anime = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);

  const { isLoading, isFetching, data, error, isError } = useQuery(
    'anime',
    () => {
      console.log(data);
      return singleResultResponse('anime', parsedId);
    },
    { refetchOnWindowFocus: false }
  );

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
        {data.title}
      </Text>
    </Flex>
  );
};
