import { createContext, useState, useEffect } from "react";
import axios from "axios"; 


const BooksContext = createContext({});

export const BooksProvider = ({ children }) => {
  const [Books, setBooks] = useState([]); 

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data.data); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); 


    
  return (
    <BooksContext.Provider value={{ Books }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
