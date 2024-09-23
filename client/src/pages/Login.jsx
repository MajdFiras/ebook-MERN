import React,{useState , useEffect} from 'react';
import { Box, Center, Input, Button ,Divider  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [user , setUsers] = useState([])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event)=>{
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/auth/login',{username,password});
      const token = response.data.token;
      console.log(token);
      setUsername("");
      setPassword("");
      navigate('/');
      window.location.reload();
      localStorage.setItem('token',JSON.stringify(token));
    } catch(err){}
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
          <h1 style={{fontSize:"25px" , fontWeight: "bold", fontFamily: "sans-serif"}} >Login</h1>
        </Center>
        <br />
        <Divider />
        <br />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Username</label>
          <Input 
            id="username" 
            type="username" 
            placeholder="Enter your username" 
            mt="2" 
            mb="4"
            value={username}
            onChange ={(e) => setUsername(e.target.value)} 
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
          <Button type="submit" backgroundColor={'#CBD5E0'}  width="full" mt="4">Login</Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;