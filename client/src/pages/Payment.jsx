import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BooksContext from '../context/BooksProvider.jsx';
import { Center, Card, CardBody, Box,Image, Text, Heading } from "@chakra-ui/react";

const Payment = () => {
  const { id } = useParams();
  const { Books } = useContext(BooksContext);
  const book = Books ? Books.find((book) => book._id === id) : null;

  return (
    <div>
      {id ? (
        book ? (
          <div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )
      ) : (
        <h1>You buy from the local storage</h1>
      )}
    </div>
  );
};

export default Payment;
