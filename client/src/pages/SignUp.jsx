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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      
      setUsername("");
      setEmail("");
      setPassword("");
      
      toast({
        title: "Registration Successful",
        description: "You can now log in with your credentials",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      navigate("/login");
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
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
            Sign Up
          </Heading>

          <Divider />

          <form onSubmit={handleRegister}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
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
                Sign Up
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default SignUp;