import React, { useContext } from 'react';
import { Flex, Box, Heading, UnorderedList, ListItem, Link, Button, IconButton, Text, Image, Badge, Divider } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverFooter , PopoverHeader ,PopoverArrow} from '@chakra-ui/react';
import { CartContext } from "../context/CartProvider";

export const Navbar = () => {
  
  const { cart, handleRemoveItem,calculateTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const isUserSignIn = !!localStorage.getItem('token');
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = calculateTotalPrice();


  return (
    <Box bg='#ffffff' color='white' position={'sticky'} top={'0'} zIndex={100} >
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
                  <PopoverContent maxW="300px">
                    <PopoverArrow />
                    <PopoverHeader >
                      <Box display={'flex'} justifyContent={'space-between'} >
                            <Text color={'black'} fontWeight={'bold'}>
                              Total Price 
                            </Text>
                            <Text color={'green'}>${totalPrice.toFixed(2)}</Text>
                      </Box>
                    </PopoverHeader>
                     
                    <PopoverBody maxH="300px" overflowY="auto"  >


                      {cart && cart.length > 0 ? (
                        cart.map((item) => (
                          <Box key={item._id} mt={2}>
                            <Flex alignItems="center" justifyContent="space-between" mb={2} bg={'#f6f6f6'} p={'10px'}>
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
                        <Text mt={2} textAlign={'center'} color={'black'}>No items in the cart.</Text>
                      )}
                    </PopoverBody>
                    <PopoverFooter>
                      <Button isDisabled={ totalQuantity >= 1 ? false : true}  backgroundColor={'#85ff8d'} _hover={{ backgroundColor: "#41ff4e" }} width="100%" onClick={()=>{
                        navigate('/payment');
                      }}   >
                        Proceeding
                      </Button>
                    </PopoverFooter>
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
                  <PopoverContent maxW="300px">
                    <PopoverArrow />
                    <PopoverHeader >
                      <Box display={'flex'} justifyContent={'space-between'} >
                            <Text color={'black'} fontWeight={'bold'}>
                              Total Price 
                            </Text>
                            <Text color={'green'}>${totalPrice.toFixed(2)}</Text>
                      </Box>
                    </PopoverHeader>
                     
                    <PopoverBody maxH="300px" overflowY="auto"  >


                      {cart && cart.length > 0 ? (
                        cart.map((item) => (
                          <Box key={item._id} mt={2}>
                            <Flex alignItems="center" justifyContent="space-between" mb={2} bg={'#f6f6f6'} p={'10px'}>
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
                        <Text mt={2} textAlign={'center'} color={'black'}>No items in the cart.</Text>
                      )}
                    </PopoverBody>
                    <PopoverFooter>
                      <Button isDisabled={ totalQuantity >= 1 ? false : true}  backgroundColor={'#85ff8d'} _hover={{ backgroundColor: "#41ff4e" }} width="100%" onClick={()=>{
                        navigate('/payment');
                      }}   >
                        Proceeding
                      </Button>
                    </PopoverFooter>
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
