import React, { useContext } from 'react';
import { Flex, Box, Heading, UnorderedList, ListItem, Link, Button, IconButton, Text, Image, Badge } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';
import { CartContext } from "../context/CartProvider";



export const Navbar = () => {

  const { cart, handleRemoveItem } = useContext(CartContext);
  const navigate = useNavigate();
  const isUserSignIn = !!localStorage.getItem('token');
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

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
                        {totalQuantity}
                      </Badge>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      {cart && cart.length > 0 ? (
                        cart.map((item) => (
                          <Box key={item._id} marginTop={'10%'}>
                            <Flex alignItems="center" justifyContent="space-between" mb={2} backgroundColor={'#f6f6f6'} padding={'10px'}>
                              <Image
                                src={item.cover}
                                alt={item.title}
                                boxSize="50px"
                                objectFit="contain"
                                maxH="50px"
                                maxW="50px"
                                borderRadius="md"
                              />
                              <Text color={'black'} ml={1}>{item.title} x{item.quantity}</Text>
                              <IconButton
                                aria-label="Delete item"
                                icon={<MdDelete color='red' />}
                                variant="ghost"
                                onClick={() => handleRemoveItem(item)}
                              />
                            </Flex>
                          </Box>
                        ))
                      ) : (
                        <Text marginTop={'10px'} textAlign={'center'} color={'black'}>No items in the cart.</Text>
                      )}

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
                        {totalQuantity}
                      </Badge>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverBody>
                      {cart && cart.length > 0 ? (
                        cart.map((item) => (
                          <Box key={item._id} marginTop={'10%'}>
                            <Flex alignItems="center" justifyContent="space-between" mb={2} backgroundColor={'#f6f6f6'} padding={'10px'}>
                              <Image
                                src={item.cover}
                                alt={item.title}
                                boxSize="50px"
                                objectFit="contain"
                                maxH="50px"
                                maxW="50px"
                                borderRadius="md"
                              />
                              <Text color={'black'} ml={1}>{item.title} x{item.quantity}</Text>
                              <IconButton
                                aria-label="Delete item"
                                icon={<MdDelete color='red' />}
                                variant="ghost"
                                onClick={() => handleRemoveItem(item)}
                              />
                            </Flex>
                          </Box>
                        ))
                      ) : (
                        <Text marginTop={'10px'} textAlign={'center'} color={'black'}>No items in the cart.</Text>
                      )}

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
