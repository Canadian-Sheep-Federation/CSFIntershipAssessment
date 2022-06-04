import { 
  Box,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
  Toast
} from "@chakra-ui/react"
import { useState } from 'react';
import axios from 'axios';

export const BookPosting = () => {
  // input controllers
  const [title, setTitle] = useState('');
  const handleTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  };
  const [author, setAuthor] = useState('');
  const handleAuthor = (event: React.FormEvent<HTMLInputElement>) => {
    setAuthor(event.currentTarget.value)
  };
  const [subject, setSubject] = useState('');
  const handleSubject = (event: React.FormEvent<HTMLInputElement>) => {
    setSubject(event.currentTarget.value)
  };

  // async axios post request
  const postData = async () => {
    axios({
      method: 'post',
      baseURL: 'http://localhost:4000',
      data: {
        title: title,
        author: author,
        subject: subject
      }
    })
    .then(function (response) {
      console.log(response);
      Toast({
        title: 'Book posted to local database',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    })
    .catch(function (error) {
      console.error(error);
    })
  }

  const handleClick = () => {
    postData();
  }


  return (
    <Box 
      maxWidth ='40%' 
      mx='auto' 
    >
      <Text>-- Local Database Book Posting --</Text>
      <Flex justifyContent='center'>
        <Text px='5px' color='orange'>Preparing to post to:</Text>
        <Text>https://localhost:4000/</Text>
      </Flex>
      <InputGroup>
        <InputLeftAddon width='85px' children='Title:' />
        <Input
          value={title}
          onChange={handleTitle}
          placeholder='book title'
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon width='85px' children='Author:' />
        <Input
          value={author}
          onChange={handleAuthor}
          placeholder='author name'
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon width='85px' children='Subject:' />
        <Input
          value={subject}
          onChange={handleSubject}
          placeholder='subject name'
        />
      </InputGroup>
      <Button 
        colorScheme='purple' 
        my='5px'
        onClick={handleClick}
      >
        POST
      </Button>
      
      
    </Box>
  )
}