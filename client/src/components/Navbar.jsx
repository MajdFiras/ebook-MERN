import React from 'react';
import { Flex, Box, Heading, UnorderedList, ListItem, Link, Button, IconButton, Text, Image, Badge } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';

export const Navbar = () => {
  const navigate = useNavigate();
  const isUserSignIn = !!localStorage.getItem('token');
  const cartItemCount = 0; 

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box bg='#ffffff' color='white'>
      <Flex
        justify='space-between'
        align='center'
        px={8}
        py={4}
        height='80px'
        maxW='1200px'
        mx='auto'
      >
        <Box>
          <Heading as={RouterLink} to="/" fontSize='2xl' color={'#2D3748'} _hover={{ color: '#005bc8' }}>
            PAPER.
          </Heading>
        </Box>

        <UnorderedList display='flex' listStyleType='none' m={0} gap='20px' alignItems='center'>
          {isUserSignIn ? (
            <>
            <ListItem display="flex" alignItems="center">
                <Popover>
                  <PopoverTrigger>
                    <Box position="relative">
                      <Button variant={'ghost'} p={0}>
                        <FaCartShopping size="20px" />
                      </Button>
                      <Badge
                        position="absolute"
                        top="-8px"
                        right="-8px"
                        bg="red.500"
                        borderRadius="full"
                        px={2}
                        fontSize="0.8em"
                        color="white"
                      >
                        {cartItemCount}
                      </Badge>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      <Box marginTop={'10%'}>
                        <Flex alignItems="center" justifyContent="space-between" mb={2} backgroundColor={'#f6f6f6'} padding={'10px'}>
                          <Image 
                            src="https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg"  
                            alt="Cart Item Image"
                            boxSize="50px"  
                            objectFit="contain" 
                            maxH="50px"       
                            maxW="50px"       
                            borderRadius="md" 
                          />
                          <Text color={'black'} ml={2}>The Great Gatsby</Text> 
                          <IconButton aria-label="Delete item" icon={<MdDelete color='red' />} variant="ghost" />
                        </Flex>
                      </Box>
                      <Button backgroundColor={'#85ff8d'} _hover={{ backgroundColor: "#41ff4e" }} width="100%" mt={4}>
                        Proceeding
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </ListItem>
              <ListItem>
                <Link as={RouterLink} to="/account" color={'#2D3748'} _hover={{ backgroundColor: "#000", color: '#fff' }}>
                  Account
                </Link>
              </ListItem>
              <ListItem>
                <Link as={RouterLink} to="/login" color={'#2D3748'} _hover={{ backgroundColor: "#000", color: '#fff' }} onClick={handleSignOut}>
                  Signout
                </Link>
              </ListItem>
              
            </>
          ) : (
            <>
              <ListItem display="flex" alignItems="center">
                <Popover>
                  <PopoverTrigger>
                    <Box position="relative">
                      <Button variant={'ghost'} p={0}>
                        <FaCartShopping size="20px" />
                      </Button>
                      <Badge
                        position="absolute"
                        top="-8px"
                        right="-8px"
                        bg="red.500"
                        borderRadius="full"
                        px={2}
                        fontSize="0.8em"
                        color="white"
                      >
                        {cartItemCount}
                      </Badge>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      <Box marginTop={'10%'}>
                        <Flex alignItems="center" justifyContent="space-between" mb={2} backgroundColor={'#f6f6f6'} padding={'10px'}>
                          <Image 
                            src="https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg"  
                            alt="Cart Item Image"
                            boxSize="50px"  
                            objectFit="contain" 
                            maxH="50px"       
                            maxW="50px"       
                            borderRadius="md" 
                          />
                          <Text color={'black'} ml={2}>The Great Gatsby</Text> 
                          <IconButton aria-label="Delete item" icon={<MdDelete color='red' />} variant="ghost" />
                        </Flex>
                      </Box>
                      <Button backgroundColor={'#85ff8d'} _hover={{ backgroundColor: "#41ff4e" }} width="100%" mt={4}>
                        Proceeding
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </ListItem>
              <ListItem>
                <Link as={RouterLink} to="/login" color={'#2D3748'} _hover={{ backgroundColor: "#000", color: '#fff' }}>
                  Login
                </Link>
              </ListItem>
              <ListItem>
                <Link as={RouterLink} to="/signup" color={'#2D3748'} _hover={{ backgroundColor: "#000", color: '#fff' }}>
                  Signup
                </Link>
              </ListItem>
            </>
          )}
        </UnorderedList>
      </Flex>
    </Box>
  );
};
