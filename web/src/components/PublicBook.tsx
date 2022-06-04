import { 
  Box,
  Flex,
  Text,
  Button,
  Input
} from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';

/**
 * Person type that matches gutendex Person object
 */
interface Person {
  name?: string
}

/**
 * Book type that matches gutendex Book object
 */
interface Book {
  _id: number;
  title: string;
  authors?: Person[];
  subjects: string[];
}

export const PublicBook = () => {
  // GET response data
  const [data, setData] = useState<Book>();
  // check if book exists to handle conditional rendering
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
        'http://gutendex.com/books/' + input
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
      <Text>-- Gutendex API Query --</Text>
      <Flex justifyContent='center'>
        <Text px='5px' color='orange'>Requesting from:</Text>
        <Text>https://gutendex.com/books/{input}</Text>
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
            <Text>{data?.authors[0]?.name}</Text>
          </Flex>
          <Flex justifyContent='center'>
            <Text px='5px' color='yellow'>Book Subjects:</Text>
            <Text>{data?.subjects[0]}</Text>
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