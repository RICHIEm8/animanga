import {
  Alert,
  AlertIcon,
  AlertTitle,
  ListItem,
  UnorderedList,
  Image,
  VStack,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { combinedAnimeResponse } from '../../api/api';

export const CharactersStaff = () => {
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

  const { charactersStaff } = data;

//   const charactersStaffList = _.map(charactersStaff.characters, (character) => {
//     const voiceActors: {} = _.map(character.voice_actors, (voiceActor) => {
//       return {
//         malId: voiceActor.mal_id,
//         name: voiceActor.name,
//         imageUrl: voiceActor.image_url,
//         language: voiceActor.language,
//       };
//       return { name: character.name, voiceActors };
//     });

    const charactersStaffList = _.map(charactersStaff.characters, (character) => {
      const voiceActors: {} = _.map(character.voice_actors, (voiceActor) => {
        return {
          malId: voiceActor.mal_id,
          name: voiceActor.name,
          imageUrl: voiceActor.image_url,
          language: voiceActor.language,
        };
      });
      return { name: character.name, voiceActors };
    });

    return (
      <ListItem key={character.mal_id} listStyleType="none" w={720} alignItems="flex-start">
        <HStack border="1px solid blue" justifyContent="space-between">
          <HStack alignItems="flex-start">
            <Image w={50} fit="cover" src={character.image_url} />
            <VStack alignItems="flex-start" spacing={0}>
              <Text fontSize="sm">{character.name}</Text>
              <Text fontSize="xs">{character.role}</Text>
            </VStack>
          </HStack>
          <UnorderedList>
            <ListItem listStyleType="none"></ListItem>
          </UnorderedList>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Flex w={720} flexDir="column">
      <Text w={720} fontWeight="bold" borderBottom="1px solid #E1E7F5">
        Characters & Voice Actors
      </Text>
      <UnorderedList w={720} mt={2} ml={0}>
        {charactersStaffList}
      </UnorderedList>
    </Flex>
  );
};
