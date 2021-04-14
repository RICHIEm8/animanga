import _ from 'lodash';
import react from 'react';
import { AnimeResult } from '../api/api';
import { Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';

interface Props {
  animeSearchResults: AnimeResult[];
}

export const Anime = (props: Props) => {
  const { animeSearchResults } = props;

  const animeResults = _.map(animeSearchResults, (anime) => {
    return (
      <WrapItem>
        <Text>{anime.title}</Text>
      </WrapItem>
    );
  });

  return <Wrap>{animeResults};</Wrap>;
};
