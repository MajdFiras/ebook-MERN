import { useState, useRef, useEffect } from 'react';
import { Center, Box, Avatar, Icon, Text, Divider, Stack, IconButton, Input, ButtonGroup, Flex } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FaCamera } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const Account = () => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
          setUserInfo(response.data);
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

  const renderFormField = (label, value, placeholder) => (
    <Flex flexDirection="column">
      <Text fontWeight="bold">{label}:</Text>
      {isEditing ? (
        <Input defaultValue={value || ''} placeholder={placeholder} />
      ) : (
        <Text>{value || `Not provided`}</Text>
      )}
    </Flex>
  );

  return (
    <Center>
      <Box boxShadow="md" margin="4%" borderRadius="10px" backgroundColor="#f2f2f2" height="auto" width="500px" padding="20px">
        <Flex justifyContent="flex-end" padding="10px">
          {!isEditing ? (
            <IconButton
              aria-label="Edit user info"
              icon={<EditIcon />}
              size="sm"
              onClick={handleEdit}
            />
          ) : (
            <ButtonGroup size="sm">
              <IconButton aria-label="Save changes" icon={<CheckIcon />} onClick={handleSave} />
              <IconButton aria-label="Cancel changes" icon={<CloseIcon />} onClick={handleCancel} />
            </ButtonGroup>
          )}
        </Flex>

        <Center padding="4%">
          {/* Avatar with hover effect */}
          <Box
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            width="fit-content"
          >
            <Avatar size="xl" name={userInfo?.username} src={userInfo?.avatar} />
            {isHovered && (
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                backgroundColor="rgba(0, 0, 0, 0.5)"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                color="white"
                opacity={isHovered ? 1 : 0}
                transition="opacity 0.3s ease"
                cursor={'pointer'}
              >
                <Icon as={FaCamera} boxSize={6} />
                <Text mt={2}>Change</Text>
              </Box>
            )}
          </Box>
        </Center>

        <Divider borderColor="#c8c8c8" />
        <br />
        <Stack paddingX="5%" spacing={4} display="flex" flexDirection="column">
          {renderFormField('Username', userInfo?.username, 'Enter username')}
          {renderFormField('Email', userInfo?.email, 'Enter email')}
          {renderFormField('Country', userInfo?.address?.country, 'Enter country')}
          {renderFormField('City', userInfo?.address?.city, 'Enter city')}
          {renderFormField('Street', userInfo?.address?.street, 'Enter street')}
          {renderFormField('Building Number', userInfo?.address?.buildingNumber, 'Enter building number')}
          {renderFormField('Residential Complex', userInfo?.address?.residentialComplex, 'Enter residential complex')}
        </Stack>
      </Box>
    </Center>
  );
};

export default Account;
