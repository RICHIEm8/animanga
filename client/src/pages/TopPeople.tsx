import {
  Flex,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  Image,
  VStack,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { useQuery } from 'react-query';
import { getTopResults } from '../api/api';

export const TopPeople = () => {
  const {
    isLoading,
    isFetching,
    data: topPeopleData,
    error,
    isError,
  } = useQuery(
    'search',
    async () => {
      return getTopResults('people');
    },
    { refetchOnWindowFocus: false }
  );

  const topPeopleResults = _.map(topPeopleData, (person) => {
    const birthday = () => {
      const birthDate = new Date(person.birthday).toDateString().split(' ');

      const [__, month, day, year] = birthDate;

      const fixedBirthday = day + ' ' + month + ',' + ' ' + year;

      return (
        <Text color="black" fontSize="lg" textAlign="center" w={340}>
          {fixedBirthday}
        </Text>
      );
    };

    return (
      <ListItem
        listStyleType="none"
        key={person.mal_id}
        ml={-16.5}
        borderBottom="1px solid #E1E7F5"
        borderX="1px solid #E1E7F5"
      >
        <HStack color="#2E51A2" spacing={0} borderX="1px solid #E1E7F5">
          <Text color="#767676" fontSize="5xl" w={97} textAlign="center">
            {person.rank}
          </Text>
          <HStack align="left" w={600} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={100} h={125} fit="cover" src={person.image_url} />
            <VStack textAlign="left" align="left" justifyContent="center" spacing={0}>
              <Text>{person.title}</Text>
              <Text color="black">({person.name_kanji})</Text>
            </VStack>
          </HStack>
          {birthday()}
        </HStack>
      </ListItem>
    );
  });

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

  if (!topPeopleData) {
    return null;
  }

  return (
    <Flex justifyContent="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Top Characters
      </Text>
      <HStack bgColor="#2E51A2" color="white" spacing={0} textAlign="center">
        <Text w={100} borderRight="1px solid #E1E7F5">
          Rank
        </Text>
        <Text w={600} borderRight="1px solid #E1E7F5">
          Person
        </Text>
        <Text w={340}>Birthday</Text>
      </HStack>
      <UnorderedList>{topPeopleResults}</UnorderedList>
    </Flex>
  );
};
