import React from 'react';
import { Flex, Box, Heading, UnorderedList, ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Box bg='#2a4365' color='white'>
      <Flex
        justify='space-between'
        align='center'
        px={8}
        py={4}
        height='80px'
        maxW='1200px'
        mx='auto'
      >
        <Heading as={RouterLink} to="/" fontSize='2xl' _hover={{ color: 'gray.400' }}>
        &#128218; BuyBook
        </Heading>
        <UnorderedList display='flex' listStyleType='none' m={0} gap='20px'>
          <ListItem>
            <Link as={RouterLink} to="/login" _hover={{ textDecoration: 'underline', color: 'gray.400' }}>
              Login
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} to="/signup" _hover={{ textDecoration: 'underline', color: 'gray.400' }}>
              Signup
            </Link>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Box>
  );
};
