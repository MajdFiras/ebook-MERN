import React,{useState} from 'react';
import { Box, Center, Input, Button ,Divider  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
  
  const [user,setUsers] = useState([]);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/auth/register',{username,email,password})
    .then(()=>{
      setUsername("");
      setEmail("");
      setPassword("");
      alert("User registered successfully");
      navigate("/login");
    }).catch((err) =>{
      console.log(err);
    }) 
  } 

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
          <h1 style={{fontSize:"25px" , fontWeight: "bold", fontFamily: "sans-serif"}}>Sign Up</h1>
        </Center>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleRegister}>
          <label htmlFor="username">Username</label>
          <Input 
            id="username" 
            type="text" 
            placeholder="Enter your username" 
            mt="2" 
            mb="4" 
            value={username}
            onChange ={(e) => setUsername(e.target.value)} 
          />
          <label htmlFor="email">Email</label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            mt="2" 
            mb="4" 
            value={email}
            onChange ={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter your password" 
            mt="2" 
            mb="4" 
            value={password}
            onChange ={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" backgroundColor={'#CBD5E0'} width="full" mt="4" >Sign Up</Button>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
