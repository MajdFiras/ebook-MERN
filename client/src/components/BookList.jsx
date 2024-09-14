import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Card, CardBody, Image, Text, Stack, Heading
} from '@chakra-ui/react';

export const BookList = () => {
  const [data, setData] = useState([]);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '40px' }}>
      {data.length > 0 ? (
        data.map((book) => (
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
  );
};
