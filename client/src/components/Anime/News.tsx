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

export const News = () => {
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
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{error}placeholder</AlertTitle>
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  const { news } = data;

  const newsList = _.map(_.take(news.articles, 10), (article) => {
    const date = new Date(article.date).toString().split(' ');
    const fixedDate = `${date[1]} ${date[2]}, ${date[3]}`;
    const articleImage = () => {
      if (!_.isNull(article.image_url)) {
        return <Image w={75} border="1px solid #E1E7F5" fit="cover" src={article.image_url} />;
      } else {
        return null;
      }
    };

    return (
      <ListItem
        key={article.title}
        listStyleType="none"
        borderBottom="1px solid #E1E7F5"
        w={720}
        mb={2}
        py={2}
        ml={-4}
      >
        <HStack align="flex-start">
          {articleImage()}
          <VStack align="flex-start">
            <Text fontWeight="bold">{article.title}</Text>
            <Text fontSize="sm">{article.intro}</Text>
            <Text fontSize="sm">
              {fixedDate} by <b>{article.author_name}</b>
            </Text>
          </VStack>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Flex w={720} flexDir="column">
      <Text w={720} fontWeight="bold" borderBottom="1px solid #E1E7F5">
        News
      </Text>
      <UnorderedList>{newsList}</UnorderedList>
    </Flex>
  );
};
