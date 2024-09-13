import React from 'react';
import { Flex, Box, Heading, UnorderedList, ListItem, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Box bg='#CBD5E0' color='white'>
      <Flex
        justify='space-between'
        align='center'
        px={8}
        py={4}
        height='80px'
        maxW='1200px'
        mx='auto'
      >
        <Heading as={RouterLink} to="/" fontSize='2xl' color={'#2D3748'} _hover={{ color: '#718096' }}>
        &#128218; BuyBook
        </Heading>
        <UnorderedList display='flex' listStyleType='none' m={0} gap='20px'>
          <ListItem>
            <Link as={RouterLink} to="/login" color={'#2D3748'} _hover={{ textDecoration: 'underline', color: '#718096' }}>
              Login
            </Link>
          </ListItem>
          <ListItem>
            <Link as={RouterLink} to="/signup" color={'#2D3748'} _hover={{ textDecoration: 'underline', color: '#718096' }}>
              Signup
            </Link>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Box>
  );
};
