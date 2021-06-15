import {
  HStack,
  ListItem,
  Text,
  UnorderedList,
  Image,
  VStack,
  Heading,
  Box,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import React from 'react';
import { TopAnimeListResponse } from '../api/api';
import { useSearch } from '../hooks/UseSearch';
import { Link } from 'react-router-dom';

interface Props {
  data: TopAnimeListResponse[];
}

export const TopAnimeLists = (props: Props) => {
  const { data } = props;

  const { subtype } = useSearch();

  const subtypeHeading = () => {
    if (subtype === undefined) {
      return (
        <Heading size="md" mb={2}>
          Top Anime Series
        </Heading>
      );
    } else if (subtype === 'airing') {
      return (
        <Heading size="md" mb={2}>
          Top Airing Anime
        </Heading>
      );
    } else if (subtype === 'upcoming') {
      return (
        <Heading size="md" mb={2}>
          Top Upcoming Anime
        </Heading>
      );
    } else if (subtype === 'tv') {
      return (
        <Heading size="md" mb={2}>
          Top TV Anime
        </Heading>
      );
    } else if (subtype === 'movie') {
      return (
        <Heading size="md" mb={2}>
          Top Anime Movies
        </Heading>
      );
    } else if (subtype === 'ova') {
      return (
        <Heading size="md" mb={2}>
          Top Anime OVA Series
        </Heading>
      );
    }
  };

  const topAnimeResults = _.map(data, (anime) => {
    const epsCheck = () => {
      if (_.isNull(anime.episodes)) {
        return '(? eps)';
      } else {
        return `(${anime.episodes} eps)`;
      }
    };

    const airingDate = () => {
      if (_.isNull(anime.end_date)) {
        return <Text>{anime.start_date} -</Text>;
      } else
        return (
          <Text>
            {anime.start_date} - {anime.end_date}
          </Text>
        );
    };

    return (
      <ListItem
        listStyleType="none"
        key={anime.mal_id}
        ml={-16.5}
        borderBottom="1px solid #E1E7F5"
        borderX="1px solid #E1E7F5"
      >
        <HStack color="#2E51A2" spacing={0} textAlign="center">
          <Text color="#767676" fontSize="6xl" w={200}>
            {_.toString(anime.rank)}
          </Text>
          <HStack align="left" w={700} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={75} h={100} fit="cover" src={anime.image_url} />
            <VStack textAlign="left" align="left">
              <Link to={`/anime/${anime.mal_id}`}>
                <Heading color="#2E51A2" size="md">
                  {anime.title}
                </Heading>
              </Link>
              <Text>
                {anime.type} {epsCheck()}
              </Text>
              {airingDate()}
            </VStack>
          </HStack>
          <HStack w={200} justifyContent="center">
            <StarIcon boxSize={5} color="#DDCC00" />
            <Text fontSize="2xl" w={65} align="left" color="black">
              {anime.score}
            </Text>
          </HStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Box>
      {subtypeHeading()}
      <HStack bgColor="#2E51A2" color="white" spacing={0} textAlign="center">
        <Text w={200} borderRight="1px solid #E1E7F5">
          Rank
        </Text>
        <Text w={700} borderRight="1px solid #E1E7F5">
          Title
        </Text>
        <Text w={200}>Score</Text>
      </HStack>
      <UnorderedList>{topAnimeResults}</UnorderedList>
    </Box>
  );
};
