import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter, Stack, Heading, Button, Image, Text, Badge, Wrap, WrapItem, Grid, GridItem, Avatar,Input} from '@chakra-ui/react';
import { CartContext } from "../context/CartProvider";
import BooksContext from '../context/BooksProvider';
import UserContext from '../context/UserProvider'; // Import UserContext



const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { book, fetchBook, comments, fetchComments } = useContext(BooksContext);
  const { addItemToCart } = useContext(CartContext);
  const { userInfo } = useContext(UserContext);
 

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
        templateColumns='repeat(15, 2fr)' 
        gap={4} 
        marginTop={'10px'}
        alignItems='center'  
      >
        <GridItem colSpan={1} display="flex">
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
  {!!localStorage.getItem("token") ? (<div>
  <Grid
        bg={'gray.100'}
        padding={'20px'}
        h='auto'
        templateColumns='repeat(15, 2fr)'  
        gap={4} 
        marginTop={'10px'}
        alignItems='center'  
      >
        <GridItem colSpan={1} display="flex"> 
          <Wrap>
            <WrapItem>
              <Avatar size='lg' name={userInfo?.username}  src={userInfo?.avatar} />
            </WrapItem>
          </Wrap>
        </GridItem>
        <GridItem colSpan={5} display={'flex'} justifyContent={'center'} alignItems={'center'} >  
            <Input
              placeholder='Write a Comment...'
              size='lg'
              _placeholder={{ opacity: 1, color: 'gray.500' }}
              variant={'outline'}
              border={'#bcbfc8 1px solid'}
            />
            <Button colorScheme='teal'marginLeft={'2%'} >POST</Button>
        </GridItem>
      </Grid>
  </div>) :(<div></div>)}
    
    </div>
  );
};

export default BookDetails;
