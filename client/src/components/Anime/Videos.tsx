import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Text,
  Wrap,
  WrapItem,
  Image,
  HStack,
  AspectRatio,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AnimeVideosResponse, combinedAnimeResponse } from '../../api/api';

interface Props {
  videos: AnimeVideosResponse;
}

export const Videos = (props: Props) => {
  const { videos } = props;

  const episodesList = _.map(videos.episodes, (episode) => {
    return (
      <WrapItem w={200} h={200} key={episode.episode}>
        <VStack alignItems="flex-start" spacing={0}>
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontSize="sm">{episode.title}</Text>
            <Text fontSize="xs">{episode.episode}</Text>
          </VStack>
          <AspectRatio width={200}>
            <Image src={episode.image_url} />
          </AspectRatio>
        </VStack>
      </WrapItem>
    );
  });

  const promosList = _.map(videos.promo, (promo) => {
    return (
      <WrapItem w={200} h={200} key={promo.title}>
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="sm">{promo.title}</Text>
          <AspectRatio width={200}>
            <iframe
              title={promo.title}
              src={_.replace(promo.video_url, 'autoplay=1', 'autoplay=0')}
              allowFullScreen
            />
          </AspectRatio>
        </VStack>
      </WrapItem>
    );
  });

  console.log(videos.episodes);

  return (
    <Flex w={720} flexDir="column">
      <Text w={720} mb={2} fontWeight="bold" borderBottom="1px solid #E1E7F5">
        Episodes
      </Text>
      <Wrap mb={20} spacing="60px">
        {episodesList}
      </Wrap>
      <Text w={720} mb={2} fontWeight="bold" borderBottom="1px solid #E1E7F5">
        Promos
      </Text>
      <Wrap mb={2}>{promosList}</Wrap>
    </Flex>
  );
};
