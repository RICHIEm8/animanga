import { Flex, Text } from '@chakra-ui/layout';
import _ from 'lodash';
import React from 'react';

import { TopAnimeResult } from '../api/api';

interface Props {
  topAnimeResults: TopAnimeResult[];
}

export const TopAnime = (props: Props) => {
  const { topAnimeResults } = props;

  console.log('top-anime hello');

  const topAnimeSearchResults = _.map(topAnimeResults, (anime) => {
    console.log('top-anime-name', anime.name);
    return <Text>{anime.name}</Text>;
  });
  return <Flex>{topAnimeSearchResults}</Flex>;
};
