import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
                color="black"
                _hover={{ background: '#2E51A2', color: 'white' }}
                onClick={() => {
                  history.push(`top-anime`);
                }}
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
              <MenuItem pl={5} color="black" _hover={{ background: '#2E51A2', color: 'white' }}>
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
              <MenuItem pl={5} color="black" _hover={{ background: '#2E51A2', color: 'white' }}>
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
              <MenuItem pl={5} color="black" _hover={{ background: '#2E51A2', color: 'white' }}>
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
                setCategory(e.target.value);
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
