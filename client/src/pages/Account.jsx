import React, { useState, useEffect } from 'react';
import { Center, Box ,Avatar, Text, Divider, Stack} from '@chakra-ui/react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Account = () => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserinfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);  
    }
  }, []); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
          setUserinfo(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); 

  {/*  <br />
  Email: */}
  
  return (
    <Center>
      <Box boxShadow='md'  margin={'4%'} borderRadius={'10px'} backgroundColor={'#dfdfdf'} height={'300px'} width={'500px'}>
        <Center padding={'4%'}>
          <Avatar size='xl' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        </Center>
        <Divider />
        <Stack marginLeft={'5%'} spacing={4} display={'flex'} flexDirection={'column'} >
          <Text><span style={{fontWeight: 'bold'}}>Username:</span> {userInfo ? userInfo.username : 'No username found'}</Text>
          <Text><span style={{fontWeight: 'bold'}}>Email:</span> {userInfo ? userInfo.email : 'No user Email found'}</Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default Account;
