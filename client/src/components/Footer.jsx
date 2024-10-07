import React from 'react'
import {Box , Text} from '@chakra-ui/react'
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <Box width={'100%'} height={'300px'} backgroundColor={'#1e1e1e'} marginTop={'3%'}  >
      <Box display={'flex'} justifyContent={'space-around'} padding={'5%'}>
          <Box>
            <Text fontSize={'3xl'} color={'white'}>PAPER</Text>
          </Box> 
          <Box >
            <ul>
              <li> <Text color={'white'}>Contact Us</Text> </li>
              <li> <Text color={'white'}>FAQ</Text> </li>
              <li><FaGithub color={'white'} width={'20px'} height={'20px'}/></li>
            </ul>
          </Box> 
      </Box>

    </Box>
  )
}

export default Footer