import React from 'react';
import { Box, Text, VStack, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box width="100%" backgroundColor="#1e1e1e" padding="3%" marginTop="3%">
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" paddingX="5%">
        <Text fontSize="3xl" color="white">
          PAPER
        </Text>

        <VStack alignItems="flex-start" spacing={0}>
          <Link href="#" color="white" _hover={{ textDecoration: 'underline' }}>
            Contact Us
          </Link>
          <Link href="#" color="white" _hover={{ textDecoration: 'underline' }}>
            FAQ
          </Link>
          <Link href="https://github.com/MajdFiras/ebook-MERN" isExternal>
            <FaGithub color="white" size="24px" />
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default Footer;
