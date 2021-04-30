import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const Home = () => {
  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Welcome to AniMan
      </Text>
    </Flex>
  );
};
