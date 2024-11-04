import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Image,
  Text,
  Badge,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Avatar,
  Input,
  Container,
  VStack,
  HStack,
  Box,
  Flex,
  ButtonGroup
} from '@chakra-ui/react';
import { CartContext } from "../context/CartProvider";
import BooksContext from '../context/BooksProvider';
import UserContext from '../context/UserProvider';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { book, fetchBook, comments, fetchComments, addComment } = useContext(BooksContext);
  const { addItemToCart } = useContext(CartContext);
  const { userInfo, fetchUserInfo } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchBook(id);
  }, [id, fetchBook]);

  useEffect(() => {
    fetchComments(id);
  }, [id, fetchComments]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(id, userInfo._id, newComment);
      setNewComment("");
    }
  };

  return (
    <Container maxW="container.xl" py={{ base: 4, md: 10 }} px={{ base: 4, md: 8 }}>
      <Card
        direction={{ base: 'column', md: 'row' }}
        overflow='hidden'
        variant='filled'
        mb={8}
      >
        <Box
          width={{ base: '100%', md: '300px' }}
          height={{ base: 'auto', md: 'auto' }}
        >
          <Image
            objectFit='cover'
            width="100%"
            height="100%"
            src={book.cover}
            alt={`${book.title} cover`}
          />
        </Box>

        <Stack flex="1">
          <CardBody>
            <VStack align="start" spacing={3}>
              <Heading size={{ base: 'md', md: 'lg' }}>{book.title}</Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{book.author}</Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{book.description}</Text>

              <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap={4}
                width="100%"
              >
                <Box>
                  <Text fontWeight="bold">Price: 
                    <Text as="span" color="green.500" ml={2}>${book.price}</Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Publish Date: 
                    <Text as="span" ml={2}>{formattedDate}</Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Quantity: 
                    <Text as="span" ml={2}>{book.amount}</Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Genre: 
                    <Text as="span" ml={2}>{book.genre}</Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">ISBN: 
                    <Text as="span" ml={2}>{book.isbn}</Text>
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status: 
                    <Text as="span" ml={2}>{book.status}</Text>
                  </Text>
                </Box>
              </Grid>

              <Box width="100%">
                <Text fontWeight="bold" mb={2}>Tags:</Text>
                <Wrap>
                  {book.tags && book.tags.map((tag, index) => (
                    <WrapItem key={index}>
                      <Badge colorScheme="blue">{tag}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </VStack>
          </CardBody>

          <CardFooter>
            <ButtonGroup spacing={4} flexWrap="wrap">
              <Button 
                variant='solid' 
                colorScheme='blue'
                onClick={() => navigate(`/payment/${id}`)}
              >
                Buy
              </Button>
              <Button
                variant='ghost'
                colorScheme='blue'
                onClick={(e) => {
                  e.stopPropagation();
                  addItemToCart(book);
                }}
              >
                Add to Cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>

      {/* Comments Section */}
      <VStack spacing={4} align="stretch" width="100%">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box
              key={index}
              bg="gray.100"
              p={{ base: 4, md: 6 }}
              borderRadius="md"
            >
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 3, md: 4 }}
                align={{ base: 'start', sm: 'center' }}
              >
                <Avatar 
                  size={{ base: 'md', md: 'lg' }}
                  name={comment.postedBy.username}
                  src={comment.postedBy.avatar}
                />
                <Box flex="1">
                  <Text fontWeight="bold">{comment.postedBy.username}</Text>
                  <Text>{comment.comment}</Text>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Posted on: {new Date(comment.created).toLocaleString()}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          <></>
        )}
      </VStack>

      {/* Add New Comment Section */}
      {!!localStorage.getItem("token") && (
        <Box
          bg="gray.100"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          mt={4}
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={4}
            align={{ base: 'stretch', sm: 'center' }}
          >
            <Avatar
              size={{ base: 'md', md: 'lg' }}
              name={userInfo?.username}
              src={userInfo?.avatar}
            />
            <HStack flex="1" spacing={4}>
              <Input
                placeholder='Write a Comment...'
                size={{ base: 'md', md: 'lg' }}
                bg="white"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                colorScheme='teal'
                onClick={handleAddComment}
                size={{ base: 'md', md: 'lg' }}
              >
                POST
              </Button>
            </HStack>
          </Flex>
        </Box>
      )}
    </Container>
  );
};

export default BookDetails;