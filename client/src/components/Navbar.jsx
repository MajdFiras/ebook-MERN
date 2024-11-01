import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
  Link,
  Button,
  IconButton,
  Text,
  Image,
  Badge,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  useMediaQuery
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { HamburgerIcon } from '@chakra-ui/icons';
import { CartContext } from "../context/CartProvider";

export const Navbar = () => {
  const { cart, handleRemoveItem, calculateTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  const isUserSignIn = !!localStorage.getItem('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = calculateTotalPrice();

  // Cart popover content component
  const CartContent = () => (
    <>
      <PopoverHeader>
        <Box display="flex" justifyContent="space-between">
          <Text color="black" fontWeight="bold">
            Total Price
          </Text>
          <Text color="green">${totalPrice.toFixed(2)}</Text>
        </Box>
      </PopoverHeader>
      <PopoverBody maxH="300px" overflowY="auto">
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <Box key={item._id} mt={2}>
              <Flex alignItems="center" justifyContent="space-between" mb={2} bg="gray.100" p="10px">
                <Image
                  src={item.cover}
                  alt={item.title}
                  boxSize="50px"
                  objectFit="contain"
                  maxH="50px"
                  maxW="50px"
                  borderRadius="md"
                />
                <Text color="black" ml={1}>
                  {item.title} x{item.quantity}
                </Text>
                <IconButton
                  aria-label="Delete item"
                  icon={<MdDelete color="red" />}
                  variant="ghost"
                  onClick={() => handleRemoveItem(item)}
                />
              </Flex>
            </Box>
          ))
        ) : (
          <Text mt={2} textAlign="center" color="black">
            No items in the cart.
          </Text>
        )}
      </PopoverBody>
      <PopoverFooter>
        <Button
          isDisabled={totalQuantity < 1}
          backgroundColor="#85ff8d"
          _hover={{ backgroundColor: "#41ff4e" }}
          width="100%"
          onClick={() => navigate('/payment')}
        >
          Proceeding
        </Button>
      </PopoverFooter>
    </>
  );

  return (
    <Box bg="white" position="sticky" top={0} zIndex={100}>
      <Flex
        justify="space-between"
        align="center"
        px={8}
        py={4}
        height="80px"
        maxW="1200px"
        mx="auto"
      >
        {/* Logo */}
        <Heading
          as={RouterLink}
          to="/"
          fontSize="2xl"
          color="#2D3748"
          _hover={{ color: '#005bc8' }}
        >
          PAPER.
        </Heading>

        {/* Navigation Items */}
        <Flex align="center" gap={4}>
          {/* Cart - Always visible */}
          <Popover>
            <PopoverTrigger>
              <Box position="relative">
                <IconButton
                  variant="ghost"
                  icon={<FaCartShopping size="20px" />}
                  aria-label="Shopping cart"
                />
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
              <CartContent />
            </PopoverContent>
          </Popover>

          {/* Desktop Navigation */}
          {!isMobile && (
            <UnorderedList
              display="flex"
              listStyleType="none"
              m={0}
              gap="20px"
              alignItems="center"
            >
              {isUserSignIn ? (
                <>
                  <ListItem>
                    <Link
                      as={RouterLink}
                      to="/account"
                      color="#2D3748"
                      _hover={{ backgroundColor: "#000", color: '#fff' }}
                      px={3}
                      py={2}
                    >
                      Account
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      as={RouterLink}
                      to="/login"
                      color="#2D3748"
                      _hover={{ backgroundColor: "#000", color: '#fff' }}
                      onClick={handleSignOut}
                      px={3}
                      py={2}
                    >
                      Signout
                    </Link>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem>
                    <Link
                      as={RouterLink}
                      to="/login"
                      color="#2D3748"
                      _hover={{ backgroundColor: "#000", color: '#fff' }}
                      px={3}
                      py={2}
                    >
                      Login
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      as={RouterLink}
                      to="/signup"
                      color="#2D3748"
                      _hover={{ backgroundColor: "#000", color: '#fff' }}
                      px={3}
                      py={2}
                    >
                      Signup
                    </Link>
                  </ListItem>
                </>
              )}
            </UnorderedList>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              onClick={onOpen}
            />
          )}
        </Flex>
      </Flex>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {isUserSignIn ? (
                <>
                  <Link
                    as={RouterLink}
                    to="/account"
                    color="#2D3748"
                    _hover={{ color: '#005bc8' }}
                    onClick={onClose}
                  >
                    Account
                  </Link>
                  <Link
                    as={RouterLink}
                    to="/login"
                    color="#2D3748"
                    _hover={{ color: '#005bc8' }}
                    onClick={() => {
                      handleSignOut();
                      onClose();
                    }}
                  >
                    Signout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    as={RouterLink}
                    to="/login"
                    color="#2D3748"
                    _hover={{ color: '#005bc8' }}
                    onClick={onClose}
                  >
                    Login
                  </Link>
                  <Link
                    as={RouterLink}
                    to="/signup"
                    color="#2D3748"
                    _hover={{ color: '#005bc8' }}
                    onClick={onClose}
                  >
                    Signup
                  </Link>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};