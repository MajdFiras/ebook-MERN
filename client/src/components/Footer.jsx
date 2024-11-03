import React from 'react';
import { Box, Container, Text, HStack, VStack, Link, Flex } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      as="footer"
      bottom={0}
      width="100%"
      bg="#1e1e1e"
      color="white"
      mt="auto"
    >
      <Container maxW="container.xl" py={6}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          gap={4}
        >
         
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
              letterSpacing="wide"
            >
              PAPER
            </Text>
            <Text fontSize="sm" color="whiteAlpha.700">
               A quiet place to read
            </Text>
          </VStack>
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Connect With Us
            </Text>
            <HStack spacing={4}>
              <Link
                href="https://github.com/MajdFiras/ebook-MERN"
                isExternal
                _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
              >
                <FaGithub size="24px" />
              </Link>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;