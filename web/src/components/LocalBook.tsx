import { 
  Box,
  Flex,
  Text,
  Button,
  Input
} from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';

interface Book {
  _id: string;
  title: string;
  author: string;
  subject: string;
}

export const LocalBook = () => {
  // GET response data
  const [data, setData] = useState<Book>();
  // book checker for conditinal rendering
  const [valid, setValidity] = useState(false);

  // input controller
  const [input, setInput] = useState('');
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value)
  };

  // async axios request
  const fetchData = async () => {
    try {
      const response = await axios(
        'http://localhost:4000/' + input
      );
      setData(response.data);
      setValidity(true);
    } catch (e) {
      setValidity(false);
      console.error(e);
    }
  }

  const handleClick = () => {
    fetchData();
  }

  return (
    <Box maxWidth='40%'>
      <Text>-- Local Database Query --</Text>
      <Flex justifyContent='center'>
        <Text px='5px' color='orange'>Requesting from:</Text>
        <Text>https://localhost:4000/{input}</Text>
      </Flex>
      
      <Input
        value={input}
        onChange={handleChange}
        placeholder='/id'
        size='sm'
        width='75%'
      />
      {
        valid ? 
        <Box>
          <Flex justifyContent='center'>
            <Text px='5px' color='red'>Book Title:</Text>
            <Text>{data?.title}</Text>
          </Flex>
          <Flex justifyContent='center'>
            <Text px='5px' color='cyan'>Book Authors:</Text>
            <Text>{data?.author}</Text>
          </Flex>
          <Flex justifyContent='center'>
            <Text px='5px' color='yellow'>Book Subjects:</Text>
            <Text>{data?.subject}</Text>
          </Flex>
        </Box> 
        : 
        <Box>-- Book Does Not Exist --</Box>
      }
      
      <Button 
        colorScheme='purple' 
        my='5px'
        onClick={handleClick}
      >
        GET
      </Button>
    </Box>
  )
}

