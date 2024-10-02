import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardBody, Image, Text, Stack, Heading, Input, Center, InputGroup, InputLeftElement, Box, IconButton 
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { BsCartPlusFill } from "react-icons/bs";
import BooksContext from '../context/BooksProvider.jsx';
import { CartContext } from "../context/CartProvider";


export const BookList = () => {
  const { cart, setCart } = useContext(CartContext);
  const { Books } = useContext(BooksContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart); 
    }
  }, [setCart]);

  
  const filteredBooks = Books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItemToCart = (book) => {
    const existingItem = cart.find(item => item._id === book._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item._id === book._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...book, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };


  return (
    <div>
      <Center>
        <Text fontSize={'3xl'} fontWeight={'bold'} marginTop={'50px'}>
          What Are you looking For ..?
        </Text>
      </Center>

      <Center>
        <InputGroup width="30%" margin={'30px'}>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='black' />
          </InputLeftElement>
          <Input
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb="10px"
            size='md'
          />
        </InputGroup>
      </Center>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Box
              position="relative"
              key={book._id}
              style={{ margin: '20px' }}
              cursor="pointer"
              role="group"
              _hover={{
                transform: 'scale(1.05)',
                transition: 'all 0.4s ease-in-out',
                boxShadow: 'xl',
              }}
            >
              <Card
                maxW="sm"
                _groupHover={{
                  transform: 'scale(1.05)', 
                  transition: 'all 0.4s ease-in-out',
                  boxShadow: 'xl',
                }}
                onClick={() => {
                  navigate(`/book/bookdetails/${book._id}`);
                }}
              >
                <CardBody>
                  <Image
                    src={book.cover}
                    alt="Book cover"
                    borderRadius="xl"
                    boxSize="500px"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">
                      {book.title} <span style={{ color: 'green', fontSize: '15px' }}>${book.price}</span>
                    </Heading>
                    <Text>{book.author}</Text>
                  </Stack>
                </CardBody>
              </Card>

              <IconButton
                aria-label="Add to cart"
                icon={<BsCartPlusFill />}
                position="absolute"
                bottom="5%"
                right="5%"
                colorScheme="green"
                borderRadius="full"
                size="lg"
                _groupHover={{
                  transform: 'scale(1.4)',  
                  transition: 'all 0.4s ease-in-out',
                  bottom: '3%',  
                  right: '3%',
                }}
                onClick={(e) => {
                  e.stopPropagation(); 
                  addItemToCart(book);
                }}
              />
            </Box>
          ))
        ) : (
          <p>No books available :(</p>
        )}
      </div>
    </div>
  );
};
