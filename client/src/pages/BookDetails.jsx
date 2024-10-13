import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Stack, Heading, Button, Image, Text, Badge, Wrap, WrapItem, Grid, GridItem, Avatar } from '@chakra-ui/react';
import { CartContext } from "../context/CartProvider";
import BooksContext from '../context/BooksProvider';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { book, fetchBook, comments, fetchComments } = useContext(BooksContext);
  const { addItemToCart } = useContext(CartContext);

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

  return (
    <div style={{ margin: '50px' }}>
      <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='filled'>
        <Image objectFit='cover' maxW={{ base: '100%', sm: '300px' }} src={book.cover} alt={`${book.title} cover`} />
        <Stack>
          <CardBody>
            <Heading size='md'>{book.title}</Heading>
            <Text py='2'>{book.author}</Text>
            <Text py='2'>{book.description}</Text>
            <Text py={2}>
              <strong>Price:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>${book.price}</span>
            </Text>
            <Text py={2}>
              <strong>Publish Date:</strong> {formattedDate}
            </Text>
            <Text py={2}>
              <strong>Remaining quantity:</strong> {book.amount}
            </Text>
            <Text py={2}>
              <strong>Genre:</strong> {book.genre}
            </Text>
            <Text py={2}>
              <strong>ISBN:</strong> {book.isbn}
            </Text>
            <Text py={2}>
              <strong>Status:</strong> {book.status}
            </Text>
            <Text py={2}>
              <strong>Tags:</strong> {book.tags && book.tags.map((tag, index) => (
                <Badge key={index} colorScheme="blue" mr={1}>{tag}</Badge>
              ))}
            </Text>
          </CardBody>
          <CardFooter>
            <Button variant='solid' colorScheme='blue' onClick={() => navigate(`/payment/${id}`)}>Buy</Button>
            <Button onClick={(e) => {
              e.stopPropagation(); 
              addItemToCart(book);
            }} variant='ghost' colorScheme='blue' marginLeft={'6px'}>
              Add to Cart
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      
      {/* Comments Section */}
      <div style={{ marginTop: '20px' }}>
  <Heading size='md'>Comments:</Heading>
  {comments.length > 0 ? (
    comments.map((comment, index) => (
      <Grid
        bg={'gray.100'}
        padding={'20px'}
        key={index}
        h='auto'
        templateColumns='repeat(15, 2fr)'  // Adjust the column distribution
        gap={4}  // Reduce the gap between avatar and comment information
        marginTop={'10px'}
        alignItems='center'  // Align items vertically in the center
      >
        <GridItem colSpan={1} display="flex"> {/* Center the avatar */}
          <Wrap>
            <WrapItem>
              <Avatar size='lg' name={comment.postedBy.username} src={comment.postedBy.avatar} />
            </WrapItem>
          </Wrap>
        </GridItem>
        <GridItem colSpan={5}>  {/* Take up the remaining space for comment text */}
          <Text><strong>{comment.postedBy.username}:</strong> {comment.comment}</Text>
          <Text fontSize="sm" color="gray.500">Posted on: {new Date(comment.created).toLocaleString()}</Text>
        </GridItem>
      </Grid>
    ))
  ) : (
    <Text>No comments yet.</Text>
  )}
</div>

    </div>
  );
};

export default BookDetails;
