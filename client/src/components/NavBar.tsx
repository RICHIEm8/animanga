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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSearch } from '../hooks/UseSearch';

export const Nav = () => {
  const history = useHistory();

  const {
    category,
    setCategory,
    query,
    setQuery,
    currentCategory,
    setCurrentCategory,
    currentQuery,
    setCurrentQuery,
  } = useSearch();

  React.useEffect(() => {
    setCurrentCategory('all');
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    history.push(`/results?category=${currentCategory}&query=${currentQuery}`);
  };

  const homeButton = () => {
    history.push('/');
  };

  const topAnimeButton = () => {
    history.push('/top-anime');
  };

  const topMangaButton = () => {
    history.push('/top-manga');
  };

  const topCharactersButton = () => {
    history.push('/top-characters');
  };

  const topPeopleButton = () => {
    history.push('/top-people');
  };

  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <LinkBox w={130} h={45} onClick={homeButton}>
        <Box>
          <Heading as="h1" color="#2E51A2">
            <LinkOverlay href="/">AniMan</LinkOverlay>
          </Heading>
        </Box>
      </LinkBox>
      <Flex justify="space-between" bg="#2E51A2" h={50}>
        <HStack fontWeight="bold" color="white" spacing={0}>
          <Menu autoSelect={false}>
            <MenuButton
              _hover={{ color: 'black', background: '#E1E7F5' }}
              px={5}
              py={3.5}
              fontWeight="bold"
              _expanded={{ color: 'black', background: '#E1E7F5' }}
            >
              Anime
            </MenuButton>
            <MenuList background="#E1E7F5" mt={-2} pb={0} borderRadius={0}>
              <MenuItem
                pl={5}
                mt={-2.5}
                color="black"
                _hover={{ background: '#2E51A2', color: 'white' }}
                onClick={topAnimeButton}
              >
                Top Anime
              </MenuItem>
              <MenuItem pl={5} color="black" _hover={{ background: '#2E51A2', color: 'white' }}>
                Seasonal Anime
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu autoSelect={false}>
            <MenuButton
              _hover={{ color: 'black', background: '#E1E7F5' }}
              px={5}
              py={3.5}
              fontWeight="bold"
              _expanded={{ color: 'black', background: '#E1E7F5' }}
            >
              Manga
            </MenuButton>
            <MenuList background="#E1E7F5" mt={-2} pb={0} borderRadius={0}>
              <MenuItem
                mt={-2.5}
                pl={5}
                color="black"
                _hover={{ background: '#2E51A2', color: 'white' }}
                onClick={topMangaButton}
              >
                Top Manga
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu autoSelect={false}>
            <MenuButton
              _hover={{ color: 'black', background: '#E1E7F5' }}
              px={5}
              py={3.5}
              fontWeight="bold"
              _expanded={{ color: 'black', background: '#E1E7F5' }}
            >
              Characters
            </MenuButton>
            <MenuList background="#E1E7F5" mt={-2} pb={0} borderRadius={0}>
              <MenuItem
                mt={-2.5}
                pl={5}
                color="black"
                _hover={{ background: '#2E51A2', color: 'white' }}
                onClick={topCharactersButton}
              >
                Top Characters
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu autoSelect={false}>
            <MenuButton
              _hover={{ color: 'black', background: '#E1E7F5' }}
              px={5}
              py={3.5}
              fontWeight="bold"
              _expanded={{ color: 'black', background: '#E1E7F5' }}
            >
              People
            </MenuButton>
            <MenuList background="#E1E7F5" mt={-2} pb={0} borderRadius={0}>
              <MenuItem
                mt={-2.5}
                pl={5}
                color="black"
                _hover={{ background: '#2E51A2', color: 'white' }}
                onClick={topPeopleButton}
              >
                Top People
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <form onSubmit={onSubmit}>
          <HStack px={15} spacing={2} h={50}>
            <Select
              size="sm"
              bgColor="white"
              borderRadius={5}
              onChange={(e) => {
                setCurrentCategory(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
              <option value="characters">Characters</option>
              <option value="people">People</option>
            </Select>
            <InputGroup size="sm">
              <Input
                bgColor="white"
                borderRadius={5}
                w={300}
                placeholder="Search Anime, Manga and more..."
                onChange={(e) => {
                  setCurrentQuery(e.target.value);
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
