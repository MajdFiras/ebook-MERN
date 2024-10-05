import { jwtDecode } from "jwt-decode"; // Adjusted import as a named import
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Chakra UI imports
import { Center, Box, Avatar, Text, Divider, Stack, IconButton, Input, ButtonGroup, Flex } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const Account = () => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserinfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const usernameInputRef = useRef(null); 

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


  const handleSave = () => {
    setIsEditing(false);
    
  };

 
  const handleCancel = () => {
    setIsEditing(false);
  };


  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (usernameInputRef.current) {
        usernameInputRef.current.focus();
      }
    }, 100); 
  };

  return (
    <Center>
      <Box boxShadow='md' margin={'4%'} borderRadius={'10px'} backgroundColor={'#f2f2f2'} height={'auto'} width={'500px'} padding={'20px'}>
        <Flex justifyContent={'flex-end'} padding={'10px'}>
          {!isEditing ? (
            <IconButton
              aria-label='Edit user info'
              icon={<EditIcon />}
              size='sm'
              onClick={handleEdit}
            />
          ) : (
            <ButtonGroup size="sm">
              <IconButton aria-label='Save changes' icon={<CheckIcon />} onClick={handleSave} />
              <IconButton aria-label='Cancel changes' icon={<CloseIcon />} onClick={handleCancel} />
            </ButtonGroup>
          )}
        </Flex>
        <Center padding={'4%'}>
          <Avatar size='xl' name={userInfo?.username} src={userInfo?.avatar} />
        </Center>
        <Divider borderColor={'#c8c8c8'} />
        <br />
        <Stack paddingX={'5%'} spacing={4} display={'flex'} flexDirection={'column'}>
          {/* Editable fields */}
          <Flex flexDirection="column">
            <Text fontWeight='bold'>Username:</Text>
            {isEditing ? (
              <Input
                ref={usernameInputRef}
                defaultValue={userInfo?.username || ''}
                placeholder='Enter username'
              />
            ) : (
              <Text>{userInfo?.username || 'No username found'}</Text>
            )}
          </Flex>
          
          <Flex flexDirection="column">
            <Text fontWeight='bold'>Email:</Text>
            {isEditing ? (
              <Input
                defaultValue={userInfo?.email || ''}
                placeholder='Enter email'
              />
            ) : (
              <Text>{userInfo?.email || 'No user email found'}</Text>
            )}
          </Flex>
          
          <Flex flexDirection="column">
            <Text fontWeight='bold'>Country:</Text>
            {isEditing ? (
              <Input
                defaultValue={userInfo?.address?.country || ''}
                placeholder='Enter country'
              />
            ) : (
              <Text>{userInfo?.address?.country || 'Not provided'}</Text>
            )}
          </Flex>

          <Flex flexDirection="column">
            <Text fontWeight='bold'>City:</Text>
            {isEditing ? (
              <Input
                defaultValue={userInfo?.address?.city || ''}
                placeholder='Enter city'
              />
            ) : (
              <Text>{userInfo?.address?.city || 'Not provided'}</Text>
            )}
          </Flex>

          <Flex flexDirection="column">
            <Text fontWeight='bold'>Street:</Text>
            {isEditing ? (
              <Input
                defaultValue={userInfo?.address?.street || ''}
                placeholder='Enter street'
              />
            ) : (
              <Text>{userInfo?.address?.street || 'Not provided'}</Text>
            )}
          </Flex>

          <Flex flexDirection="column">
            <Text fontWeight='bold'>Building Number:</Text>
            {isEditing ? (
              <Input
                defaultValue={userInfo?.address?.buildingNumber || ''}
                placeholder='Enter building number'
              />
            ) : (
              <Text>{userInfo?.address?.buildingNumber || 'Not provided'}</Text>
            )}
          </Flex>

          <Flex flexDirection="column">
            <Text fontWeight='bold'>Residential Complex:</Text>
            {isEditing ? (
              <Input
                defaultValue={userInfo?.address?.residentialComplex || ''}
                placeholder='Enter residential complex'
               
              />
            ) : (
              <Text>{userInfo?.address?.residentialComplex || 'Not provided'}</Text>
            )}
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};

export default Account;
