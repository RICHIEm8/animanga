import { Flex, HStack, Image, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { AnimeReviewsResponse } from '../../api/api';

interface Props {
  reviews: AnimeReviewsResponse;
}

export const Reviews = (props: Props) => {
  const { reviews } = props;

  const reviewsList = _.map(_.take(reviews.reviews, 20), (review) => {
    const date = new Date(review.date).toString().split(' ');
    const fixedDate = `${date[1]} ${date[2]}, ${date[3]}`;

    return (
      <ListItem
        key={review.mal_id}
        listStyleType="none"
        h={200}
        w={720}
        borderBottom="1px solid #E1E7F5"
        ml={-4}
      >
        <HStack
          align="flex-start"
          justify="space-between"
          borderBottom="1px solid #E1E7F5"
          p={2}
          bgColor="#ECF2FF"
          mt={2}
          w={720}
        >
          <HStack align="flex-start">
            <Image w={50} border="1px solid #E1E7F5" fit="cover" src={review.reviewer.image_url} />
            <Text fontWeight="bold">{review.reviewer.username}</Text>
          </HStack>
          <VStack align="flex-end" p={2}>
            <Text>{fixedDate}</Text>
            <Text>Overall Rating: {review.reviewer.scores.overall}</Text>
          </VStack>
        </HStack>
        <Text noOfLines={4} mt={2} fontSize="sm">
          {review.content}
        </Text>
      </ListItem>
    );
  });

  return (
    <Flex w={720} flexDir="column">
      <Text fontWeight="bold" borderBottom="1px solid #E1E7F5" w={720}>
        Reviews
      </Text>
      <UnorderedList>{reviewsList}</UnorderedList>
    </Flex>
  );
};
