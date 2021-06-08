import { AspectRatio, Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const Home = () => {
  return (
    <Flex justify="center" flexDir="column" mx={200}>
      <Text bgColor="#E1E7F5" fontWeight="bold" fontSize={20} pl={1}>
        Welcome to AniMan
      </Text>
      <Flex>
        <Box>
          <AspectRatio width={500}>
            <iframe
              title={`test vid`}
              // src={animeVideos.promo[0].video_url}
              src="https://www.youtube.com/embed/--IcmZkvL0Q?enablejsapi=1&wmode=opaque&autoplay=1"
              allowFullScreen
            />
          </AspectRatio>
        </Box>
      </Flex>
    </Flex>
  );
};
