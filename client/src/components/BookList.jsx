import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Image,
  Text,
  Stack,
  Heading,
  Input,
  Center,
  InputGroup,
  InputLeftElement,
  Box,
  IconButton,
  Container,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { BsCartPlusFill } from "react-icons/bs";
import BooksContext from '../context/BooksProvider.jsx';
import { CartContext } from "../context/CartProvider";
import Pagination from './Pagination';

export const BookList = () => {
  const { addItemToCart } = useContext(CartContext);
  const { Books } = useContext(BooksContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const filteredBooks = Books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container maxW="container.xl" px={{ base: 2, md: 8 }}>
      <VStack spacing={{ base: 4, md: 8 }} width="100%" py={{ base: 4, md: 8 }}>
        <Heading
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="bold"
          textAlign="center"
        >
          What Are you looking For ..?
        </Heading>

        <InputGroup 
          width={{ base: "95%", md: "50%", lg: "30%" }}
          mb={{ base: 4, md: 8 }}
        >
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='black' />
          </InputLeftElement>
          <Input
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='md'
          />
        </InputGroup>

        <SimpleGrid
          columns={{ base: 2, sm: 2, md: 3, lg: 4 }}
          spacing={{ base: 2, sm: 3, md: 6 }}
          width="100%"
        >
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <Box
                position="relative"
                key={book._id}
                role="group"
                transition="all 0.3s"
                _hover={{
                  transform: { base: 'none', md: 'translateY(-4px)' },
                  boxShadow: { base: 'none', md: 'xl' },
                }}
              >
                <Card
                  height="100%"
                  onClick={() => {
                    navigate(`/book/bookdetails/${book._id}`);
                  }}
                >
                  <CardBody padding={{ base: 2, md: 4 }}>
                    <Image
                      src={book.cover}
                      alt="Book cover"
                      borderRadius="lg"
                      width="100%"
                      height="auto"
                      objectFit="cover"
                      aspectRatio="2/3"
                    />
                    <Stack mt={{ base: 2, md: 4 }} spacing={{ base: 1, md: 2 }}>
                      <Heading size={{ base: "xs", md: "sm" }} noOfLines={2}>
                        {book.title} 
                        <Text 
                          as="span" 
                          color="green.500" 
                          fontSize={{ base: "xs", md: "sm" }} 
                          ml={2}
                        >
                          ${book.price}
                        </Text>
                      </Heading>
                      <Text 
                        fontSize={{ base: "xs", md: "sm" }} 
                        noOfLines={1}
                      >
                        {book.author}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>

                <IconButton
                  aria-label="Add to cart"
                  icon={<BsCartPlusFill />}
                  position="absolute"
                  bottom={{ base: 2, md: 4 }}
                  right={{ base: 2, md: 4 }}
                  colorScheme="green"
                  borderRadius="full"
                  size={{ base: "sm", md: "md" }}
                  opacity="0.9"
                  _groupHover={{
                    transform: { base: 'none', md: 'scale(1.1)' },
                    opacity: 1,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItemToCart(book);
                  }}
                />
              </Box>
            ))
          ) : (
            <Text textAlign="center" gridColumn="1/-1">No books available :(</Text>
          )}
        </SimpleGrid>

        <Center width="100%" mt={{ base: 4, md: 8 }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </Center>
      </VStack>
    </Container>
  );
};

export default BookList;