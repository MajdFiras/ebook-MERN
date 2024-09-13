import React from 'react';
import { Box, Center, Input, Button } from '@chakra-ui/react';

const SignUp = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box 
        w="400px" 
        p="6" 
        boxShadow="lg" 
        borderRadius="md" 
        background="white"
      >
        <Center>
          <h1>Sign Up</h1>
        </Center>
        <form>
          <label htmlFor="username">Username</label>
          <Input 
            id="username" 
            type="text" 
            placeholder="Enter your username" 
            mt="2" 
            mb="4" 
          />
          <label htmlFor="email">Email</label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            mt="2" 
            mb="4" 
          />
          <label htmlFor="password">Password</label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter your password" 
            mt="2" 
            mb="4" 
          />
          <Button type="submit" colorScheme="teal" width="full" mt="4">Sign Up</Button>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
