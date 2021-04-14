import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const Nav = () => {
  return (
    <Flex justify="center" flexDir="column" mx={250}>
      <Heading as="h1" color="#2E51A2" my={5}>
        AniManga
      </Heading>
      <Flex justify="space-between" bg="#2E51A2" h={50}>
        <HStack color="white" spacing={10} px={5}>
          <Text>Anime</Text>
          <Text>Manga</Text>
        </HStack>
        <HStack px={15} spacing={2}>
          <Select size="sm" bgColor="white" borderRadius={5}>
            {/* <option value="all">All</option> */}
            <option value="anime">Anime</option>
            <option value="manga">Manga</option>
          </Select>
          <InputGroup size="sm">
            <Input
              bgColor="white"
              borderRadius={5}
              w={300}
              placeholder="Search Anime, Manga and more..."
            />
            <InputRightElement
              children={<IconButton size="sm" aria-label="Search API" icon={<SearchIcon />} />}
            />
          </InputGroup>
        </HStack>
      </Flex>
      <Text bgColor="#E1E7F5" mt={0} pl={2} fontWeight="bold" fontSize={20}>
        Welcome to Animanga
      </Text>
    </Flex>
  );
};
