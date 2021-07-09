import { Flex, HStack, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { AnimeCharactersStaffResponse } from '../../api/api';

interface Props {
  charactersStaff: AnimeCharactersStaffResponse;
}

export const CharactersStaff = (props: Props) => {
  const { charactersStaff } = props;

  const charactersStaffList = _.map(charactersStaff.characters, (character) => {
    const voiceActors = _.map(character.voice_actors, (voiceActor) => {
      return (
        <ListItem
          listStyleType="none"
          key={voiceActor.mal_id}
          display="flex"
          justifyContent="flex-end"
        >
          <HStack>
            <VStack display="flex" alignItems="flex-end">
              <Text fontSize="sm">{voiceActor.name}</Text>
              <Text fontSize="xs">{voiceActor.language}</Text>
            </VStack>
            <Image w={50} fit="cover" src={voiceActor.image_url} />
          </HStack>
        </ListItem>
      );
    });

    return (
      <ListItem key={character.mal_id} listStyleType="none" w={720} alignItems="flex-start">
        <HStack justifyContent="space-between" alignItems="flex-start">
          <HStack alignItems="flex-start">
            <Image w={50} fit="cover" src={character.image_url} />
            <VStack alignItems="flex-start" spacing={0}>
              <Text fontSize="sm">{character.name}</Text>
              <Text fontSize="xs">{character.role}</Text>
            </VStack>
          </HStack>
          <UnorderedList w={300}>{voiceActors}</UnorderedList>
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
