import React, { useState } from 'react';
import {
  Box,
  Container,
  Input,
  Button,
  Divider,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const token = response.data.token;
      console.log(token);
      setUsername("");
      setPassword("");
      navigate('/');
      window.location.reload();
      localStorage.setItem('token', JSON.stringify(token));
      
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      maxW="100vw"
      minH="100vh"
      p={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        w={{ base: "90%", sm: "400px" }}
        p={{ base: 4, sm: 6 }}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
      >
        <VStack spacing={4} align="stretch">
          <Heading
            textAlign="center"
            size="lg"
            fontFamily="sans-serif"
          >
            Login
          </Heading>

          <Divider />

          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                />
              </FormControl>

              <Button
                type="submit"
                width="100%"
                bg="gray.200"
                _hover={{ bg: 'gray.300' }}
                size="lg"
                mt={2}
              >
                Login
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;