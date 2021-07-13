import { Image, Text, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { AnimeResponse } from '../../api/api';

interface Props {
  details: AnimeResponse;
}

export const SideInfo = (props: Props) => {
  const { details } = props;

  const studios = _.map(details.studios, (studio) => {
    return studio.name;
  });

  const producers = _.map(details.producers, (producer) => {
    return producer.name;
  });

  const genres = _.map(details.genres, (genre) => {
    return genre.name;
  });
  return (
    <VStack w={300} px={3} pt={2} align="left" fontSize="sm">
      <Image w={275} fit="cover" src={details.image_url} />
      <Text borderBottom="1px solid black" fontWeight="bold" pt={5}>
        Alternative Titles
      </Text>
      <Text>
        <b>English:</b> {details.title_english}
      </Text>
      <Text>
        <b>Synonym:</b> {details.title_synonyms.join(', ')}
      </Text>
      <Text>
        <b>Japanese:</b> {details.title_japanese}
      </Text>
      <Text borderBottom="1px solid black" fontWeight="bold" pt={5}>
        Information
      </Text>
      <Text>
        <b>Type:</b> {details.type}
      </Text>
      <Text>
        <b>Episodes:</b> {details.episodes}
      </Text>
      <Text>
        <b>Status:</b> {details.status}
      </Text>
      <Text>
        <b>Premiered:</b> {details.premiered}
      </Text>
      <Text>
        <b>Producers:</b> {producers.join(', ')}
      </Text>
      <Text>
        <b>Studios:</b> {studios.join(', ')}
      </Text>
      <Text>
        <b>Sources:</b> {details.source}
      </Text>
      <Text>
        <b>Genres:</b> {genres.join(', ')}
      </Text>
      <Text>
        <b>Duration:</b> {details.duration}
      </Text>
      <Text>
        <b>Rating:</b> {details.rating}
      </Text>
      <Text borderBottom="1px solid black" fontWeight="bold" pt={5}>
        Statistics
      </Text>
      <Text>
        <b>Score:</b> {details.score}
      </Text>
      <Text>
        <b>Ranked:</b> {details.rank}
      </Text>
    </VStack>
  );
};
