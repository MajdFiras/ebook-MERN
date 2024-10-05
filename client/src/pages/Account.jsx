import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


// NOTE :ChakraUI componenets Imports
import { Center, Box ,Avatar, Text, Divider, Stack} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
// ==================================

// NOTE: Icons imports from react-icons
import { PiUserCircleFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
// ====================================


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

  
  
  return (
    <Center>
      <Box boxShadow='md'  margin={'4%'} borderRadius={'10px'} backgroundColor={'#f2f2f2'} height={'300px'} width={'500px'}>
        <Center padding={'4%'}>
          <Avatar size='xl' name={userInfo?.username} src={userInfo?.avatar} />
        </Center>
        <Divider borderColor={'#c8c8c8'}  />
        <br />
        <Stack marginLeft={'5%'} spacing={4} display={'flex'} flexDirection={'column'} >
          <Text><span style={{fontWeight: 'bold'}}>Username:</span> {userInfo ? userInfo.username : 'No username found'}</Text>
          <Text><span style={{fontWeight: 'bold'}}>Email:</span> {userInfo ? userInfo.email : 'No user Email found'}</Text>
          <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Address Details
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
               <AccordionPanel pb={4}>
                  
               </AccordionPanel>
              </AccordionItem>
          </Accordion>
        </Stack>
      </Box>
    </Center>
  );
};

export default Account;
  