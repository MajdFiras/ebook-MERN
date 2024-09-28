import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import {store} from './Store/store.js'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
 <StrictMode>
   <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </ChakraProvider>
   </BrowserRouter>
 </StrictMode>,
)
