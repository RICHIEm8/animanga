import { Alert, AlertIcon, AlertTitle, Flex, Text, Wrap, WrapItem, Image } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { combinedAnimeResponse } from '../../api/api';

export const Pictures = () => {
  const { id } = useParams<{ id: string }>();
  const parsedId = parseInt(id);
  const { isLoading, isFetching, data, error, isError } = useQuery(
    'anime',
    () => {
      return combinedAnimeResponse('anime', parsedId);
    },
    { refetchOnWindowFocus: false }
  );

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{error}placeholder</AlertTitle>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  const { pictures } = data;

  const picturesList = _.map(pictures.pictures, (picture) => {
    return (
      <WrapItem>
        <Image w={150} border="1px solid #E1E7F5" fit="cover" src={picture.large} />
      </WrapItem>
    );
  });

  return (
    <Flex w={720} flexDir="column">
      <Text w={720} mb={2} fontWeight="bold" borderBottom="1px solid #E1E7F5">
        Pictures
      </Text>
      <Wrap border="1px solid red" justifyContent="space-between">
        {picturesList}
      </Wrap>
    </Flex>
  );
};
