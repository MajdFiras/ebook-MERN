import { createContext, useState, useEffect } from "react";
import axios from "axios";

const BooksContext = createContext({});

export const BooksProvider = ({ children }) => {
  const [Books, setBooks] = useState([]); 
  const [comments, setComments] = useState([]); // Initialize as an empty array
  const [book, setBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBook = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/comment/${bookId}`);
      setComments(response.data.comments);  // Fixed this to response.data.comments
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ Books, book, fetchBook, comments, fetchComments }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
