import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter , Stack , Heading , Button , Image , Text,Badge } from '@chakra-ui/react'
import axios from 'axios';


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  useEffect(() => {
    const fetchBook = async ()=>{
      try{
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data.data);
        
      }
      catch(err){
        console.log(err);
      }
    };
    fetchBook();
  },[])
  
  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  
  
  return (
    <div style={{margin: '50px'}}>
     
     <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='filled'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '300px' }}
          src={book.cover}
          alt= {book.title + 'cover'}
        />
        <Stack>
          <CardBody>
            <Heading size='md'>{book.title}</Heading>
            <Text py='2'>{book.author}</Text>
            {/* // TODO: ADD THE DESCRIPTION HERE !! */}
            <Text py='2'>
              Caffè latte is a coffee beverage of Italian origin made with espresso
              and steamed milk.
            </Text>
            <Text py={2}>
             <strong>Price:</strong>   <span style={{color:'green', fontWeight:'bold'}}>${book.price}</span>
            </Text>
          {/* // -- TODO: ---------------------------- */}
            <Text py={2}>
             <strong>Publish Date</strong> : {formattedDate}
            </Text>
            <Text py={2}>
              <strong>Remaining quantity :</strong> {book.amount} 
            </Text>
            <Text py={2}>
              <strong>genre :</strong> {book.genre} 
            </Text>
            <Text py={2}>
              <strong>ISBN :</strong> {book.isbn} 
            </Text>
            <Text py={2}>
              <strong>Status :</strong> {book.status} 
            </Text>
            <Text py={2}>
              <strong>Tags:</strong>  {book.tags && book.tags.map((tag,index) => (<Badge key={index} colorScheme="blue" mr={1}>
                  {tag}
                </Badge>))} 
            </Text>
          
           </CardBody>

          <CardFooter>
            <Button variant='solid' colorScheme='blue' >
              Buy
            </Button>
            <Button variant='ghost' colorScheme='blue' marginLeft={'6px'} >
              Add to Cart
            </Button>
          </CardFooter>
        </Stack>
</Card>
    </div>
  );
};

export default BookDetails;
