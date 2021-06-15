import {
  HStack,
  ListItem,
  Text,
  UnorderedList,
  Image,
  VStack,
  Link,
  Heading,
  Box,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import React from 'react';
import { TopMangaListResponse } from '../api/api';
import { useSearch } from '../hooks/UseSearch';

interface Props {
  data: TopMangaListResponse[];
}

export const TopMangaLists = (props: Props) => {
  const { data } = props;

  const { subtype } = useSearch();

  const subtypeHeading = () => {
    if (subtype === undefined) {
      return (
        <Heading size="md" mb={2}>
          All Manga
        </Heading>
      );
    } else if (subtype === 'manga') {
      return (
        <Heading size="md" mb={2}>
          Top Manga
        </Heading>
      );
    } else if (subtype === 'oneshots') {
      return (
        <Heading size="md" mb={2}>
          Top One-shots
        </Heading>
      );
    } else if (subtype === 'novels') {
      return (
        <Heading size="md" mb={2}>
          Top Novels
        </Heading>
      );
    } else if (subtype === 'manhwa') {
      return (
        <Heading size="md" mb={2}>
          Top Manhwa
        </Heading>
      );
    } else if (subtype === 'manhua') {
      return (
        <Heading size="md" mb={2}>
          Top Manhua
        </Heading>
      );
    }
  };

  const topMangaResults = _.map(data, (manga) => {
    const chptCheck = () => {
      if (_.isNull(manga.volumes)) {
        return '(? vols)';
      } else {
        return `(${manga.volumes} vols)`;
      }
    };

    const airingDate = () => {
      if (_.isNull(manga.end_date)) {
        return <Text>{manga.start_date} -</Text>;
      } else
        return (
          <Text>
            {manga.start_date} - {manga.end_date}
          </Text>
        );
    };

    return (
      <ListItem
        listStyleType="none"
        key={manga.mal_id}
        ml={-16.5}
        borderBottom="1px solid #E1E7F5"
        borderX="1px solid #E1E7F5"
      >
        <HStack color="#2E51A2" spacing={0} textAlign="center">
          <Text color="#767676" fontSize="6xl" w={200}>
            {_.toString(manga.rank)}
          </Text>
          <HStack align="left" w={700} py={2} pl={2} borderX="1px solid #E1E7F5">
            <Image w={75} h={100} fit="cover" src={manga.image_url} />
            <VStack textAlign="left" align="left">
              <Link>
                <Heading color="#2E51A2" size="md">
                  {manga.title}
                </Heading>
              </Link>
              <Text>
                {manga.type} {chptCheck()}
              </Text>
              {airingDate()}
            </VStack>
          </HStack>
          <HStack w={200} justifyContent="center">
            <StarIcon boxSize={5} color="#DDCC00" />
            <Text fontSize="2xl" w={65} align="left" color="black">
              {manga.score}
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
      <UnorderedList>{topMangaResults}</UnorderedList>
    </Box>
  );
};
