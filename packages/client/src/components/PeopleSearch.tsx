import React from 'react';
import { Image } from '@chakra-ui/image';
import { Heading, HStack, Link, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/layout';
import _ from 'lodash';
import { PeopleResultResponse } from '../api/api';

interface Props {
  peopleSearchResult: PeopleResultResponse[];
}

export const People = (props: Props) => {
  const { peopleSearchResult } = props;

  const peopleResult = _.map(peopleSearchResult, (people) => {
    const altNames = !_.isEmpty(people.alternative_names) ? (
      <Text fontSize="xs">({_.join(people.alternative_names, ', ')})</Text>
    ) : null;

    return (
      <ListItem listStyleType="none" key={people.mal_id} py={2} borderBottom="1px solid #E1E7F5">
        <HStack>
          <Image w={50} h={75} fit="cover" src={people.image_url} />
          <VStack align="left">
            <Link>
              <Heading color="#2E51A2" size="xs">
                {people.name}
              </Heading>
            </Link>

            {altNames}
          </VStack>
        </HStack>
      </ListItem>
    );
  });
  return (
    <UnorderedList>
      <Text fontWeight="bold" borderBottom="1px" mb={2} mr={4}>
        Search Results
      </Text>
      {peopleResult}
    </UnorderedList>
  );
};
