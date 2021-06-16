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
import { useParams } from 'react-router';
import { combinedAnimeResponse } from '../../api/api';

export const Details = () => {
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
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}placeholder</AlertTitle>
    </Alert>;
  }

  if (!data) {
    return null;
  }

  const { details, videos, charactersStaff, reviews, news } = data;

  const studios = _.map(details.studios, (studio) => {
    return studio.name;
  });

  const relatedItems = _.map(details.related, (value, key) => {
    const relatedItemNames = _.map(value, ({ name }) => name);
    return (
      <Text borderBottom="1px solid #E1E7F5" w={720} key={key} pb={1} pt={1}>
        <b>{key}:</b> {relatedItemNames.join(', ')}
      </Text>
    );
  });

  const charactersList = _.map(_.take(charactersStaff.characters, 10), (character) => {
    const voiceActorsName = _.map(character.voice_actors, (voice_actors) => {
      return voice_actors.name;
    });
    const voiceActorImg = _.map(character.voice_actors, (voice_actors) => {
      return voice_actors.image_url;
    });
    const voiceActorNat = _.map(character.voice_actors, (voice_actors) => {
      return voice_actors.language;
    });

    return (
      <WrapItem key={character.mal_id} w={356} py={2}>
        <HStack justifyContent="space-between" spacing={50} w={360}>
          <HStack alignItems="flex-start" w={160}>
            <Image w={50} fit="cover" src={character.image_url} />
            <VStack alignItems="flex-start" spacing={0}>
              <Text fontSize="sm">{character.name}</Text>
              <Text fontSize="xs">{character.role}</Text>
            </VStack>
          </HStack>
          <HStack w={160} spacing={0} align="flex-start">
            <VStack w={100} h={50} align="flex-start" mr={2}>
              <Text fontSize="sm" mt={2}>
                {voiceActorsName[0]}
              </Text>
              <Text fontSize="xs">{voiceActorNat[0]}</Text>
            </VStack>
            <Image w={50} fit="cover" src={voiceActorImg[0]} />
          </HStack>
        </HStack>
      </WrapItem>
    );
  });

  const openingsList = _.map(details.opening_themes, (opening) => {
    return (
      <ListItem fontSize="sm" listStyleType="none" key={opening} mb={2}>
        {opening}
      </ListItem>
    );
  });

  const endingsList = _.map(details.ending_themes, (ending) => {
    return (
      <ListItem fontSize="sm" listStyleType="none" key={ending} mb={2}>
        {ending}
      </ListItem>
    );
  });

  const reviewsList = _.map(_.take(reviews.reviews, 4), (review) => {
    const date = new Date(review.date).toString().split(' ');
    const fixedDate = `${date[1]} ${date[2]}, ${date[3]}`;

    return (
      <ListItem
        key={review.mal_id}
        listStyleType="none"
        h={200}
        w={720}
        borderBottom="1px solid #E1E7F5"
        ml={-4}
      >
        <HStack
          align="flex-start"
          justify="space-between"
          borderBottom="1px solid #E1E7F5"
          p={2}
          bgColor="#ECF2FF"
          mt={2}
          w={720}
        >
          <HStack align="flex-start">
            <Image w={50} border="1px solid #E1E7F5" fit="cover" src={review.reviewer.image_url} />
            <Text fontWeight="bold">{review.reviewer.username}</Text>
          </HStack>
          <VStack align="flex-end" p={2}>
            <Text>{fixedDate}</Text>
            <Text>Overall Rating: {review.reviewer.scores.overall}</Text>
          </VStack>
        </HStack>
        <Text noOfLines={4} mt={2} fontSize="sm">
          {review.content}
        </Text>
      </ListItem>
    );
  });

  const newsList = _.map(_.take(news.articles, 2), (article) => {
    const date = new Date(article.date).toString().split(' ');
    const fixedDate = `${date[1]} ${date[2]}, ${date[3]}`;

    return (
      <ListItem
        key={article.title}
        listStyleType="none"
        borderBottom="1px solid #E1E7F5"
        w={720}
        mb={2}
        py={2}
        ml={-4}
      >
        <HStack align="flex-start">
          <Image w={75} border="1px solid #E1E7F5" fit="cover" src={article.image_url} />
          <VStack align="flex-start">
            <Text fontWeight="bold">{article.title}</Text>
            <Text fontSize="sm">{article.intro}</Text>
            <Text fontSize="sm">
              {fixedDate} by <b>{article.author_name}</b>
            </Text>
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="flex-start" w={720}>
        <HStack justifyContent="flex-start" spacing={8} bgColor="#ECF2FF" w={412}>
          <VStack borderRight="1px solid black" px={2} py={2} my={2}>
            <Text mb={-3} bgColor="#2E51A2" color="white" px={5} borderRadius={5}>
              Score
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {details.score}
            </Text>
            <Text fontSize="xs">
              Ranked #<b>{details.rank}</b>
            </Text>
          </VStack>
          <HStack justifyContent="space-between" spacing={5}>
            <Text borderRight="1px solid black" pr={5}>
              {details.premiered}
            </Text>
            <Text borderRight="1px solid black" pr={5}>
              {details.type}
            </Text>
            <Text>{studios.join(', ')}</Text>
          </HStack>
        </HStack>
        <AspectRatio w={300}>
          <iframe
            title={`${details.title} promo vid`}
            src={_.replace(videos.promo[0].video_url, 'autoplay=1', 'autoplay=0')}
            allowFullScreen
          />
        </AspectRatio>
      </HStack>
      <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={2}>
        Synopsis
      </Text>
      <Text w={720} pt={2}>
        {details.synopsis}
      </Text>
      <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={5}>
        Related Anime
      </Text>
      {relatedItems}
      <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={5}>
        Characters and Voice Actors
      </Text>
      <Wrap justify="space-between" w={720} spacing={0}>
        {charactersList}
      </Wrap>
      <HStack w={720} minH={100} align="flex-start" justifyContent="space-between" pt={5}>
        <VStack>
          <Text fontWeight="bold" borderBottom="1px solid black" w={360}>
            Opening Theme
          </Text>
          <UnorderedList>{openingsList}</UnorderedList>
        </VStack>
        <VStack>
          <Text fontWeight="bold" borderBottom="1px solid black" w={350}>
            Ending Theme
          </Text>
          <UnorderedList>{endingsList}</UnorderedList>
        </VStack>
      </HStack>
      <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={5}>
        Reviews
      </Text>
      <UnorderedList>{reviewsList}</UnorderedList>
      <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={5}>
        News
      </Text>
      <UnorderedList>{newsList}</UnorderedList>
      <Text fontWeight="bold" borderBottom="1px solid black" w={720} pt={5}>
        Recommendations
      </Text>
    </Box>
  );
};
