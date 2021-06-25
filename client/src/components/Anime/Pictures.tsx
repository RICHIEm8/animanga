import { Alert, AlertIcon, AlertTitle, Flex, Text, Wrap, WrapItem, Image } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AnimePicturesResponse, combinedAnimeResponse } from '../../api/api';

interface Props {
  pictures: AnimePicturesResponse;
}

export const Pictures = (props: Props) => {
  const { pictures } = props;

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
      <Wrap spacing="36px">{picturesList}</Wrap>
    </Flex>
  );
};
