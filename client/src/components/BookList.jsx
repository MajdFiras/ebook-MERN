import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    Card, CardBody, Image, Text, Stack, Heading, Input , Center, InputGroup , InputLeftElement, 
    Box, 
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'

export const BookList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);
  
  // Filter the books based on the search term
  const filteredBooks = data.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div> 
      <Center>
        <Text fontSize={'3xl'} fontWeight={'bold'}  marginTop={'50px'} >What Are you looking For ..?</Text>
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
            <Card
              key={book._id}
              maxW="sm"
              style={{ margin: '20px' }}
              cursor="pointer"
              _hover={{
                transform: 'scale(1.03)',
                transition: 'all 0.5s ease-in-out',
                boxShadow: 'xl'
              }}
              onClick={() => {
                navigate(`/book/bookdetails/${book._id}`)
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
                  <Text>{book.description}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>No books available :(</p>
        )}
      </div>
    </div>
  );
};
