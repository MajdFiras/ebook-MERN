import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { BooksProvider } from './context/BooksProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx'; 
import { UserProvider } from './context/UserProvider.jsx';
createRoot(document.getElementById('root')).render(
 <StrictMode>
   <BrowserRouter>
      <ChakraProvider>
        <BooksProvider>
         <CartProvider> 
          <UserProvider>
           <App />
          </UserProvider>
         </CartProvider>
        </BooksProvider>
      </ChakraProvider>
   </BrowserRouter>
 </StrictMode>,
)
