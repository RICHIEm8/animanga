import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  LinkOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { useSearchContext } from '../hooks/SearchContext';

export const Nav = () => {
  const history = useHistory();

  const { category, setCategory, query, setQuery, refetch } = useSearchContext();

  React.useEffect(() => {
    setCategory('all');
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await refetch();
    history.push(`/results?category=${category}&query=${query}`);
  };

  const homeButton = () => {
    history.push('/');
  };

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <LinkBox w={130} h={45}>
        <Box>
          <Heading as="h1" color="#2E51A2" onClick={homeButton}>
            <LinkOverlay href="/">AniMan</LinkOverlay>
          </Heading>
        </Box>
      </LinkBox>
      <Flex justify="space-between" bg="#2E51A2" h={50}>
        <HStack fontWeight="bold" color="white" spacing={10} px={5}>
          <Text>Anime</Text>
          <Text>Manga</Text>
        </HStack>
        <form onSubmit={onSubmit}>
          <HStack px={15} spacing={2} h={50}>
            <Select
              size="sm"
              bgColor="white"
              borderRadius={5}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
              <option value="characters">Characters</option>
              <option value="people">People</option>
              <option value="news">News</option>
            </Select>
            <InputGroup size="sm">
              <Input
                bgColor="white"
                borderRadius={5}
                w={300}
                placeholder="Search Anime, Manga and more..."
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <InputRightElement
                children={
                  <IconButton
                    onClick={onSubmit}
                    size="sm"
                    aria-label="Search API"
                    icon={<SearchIcon />}
                  />
                }
              />
            </InputGroup>
          </HStack>
        </form>
      </Flex>
    </Flex>
  );
};
