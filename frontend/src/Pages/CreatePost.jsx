import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const postData = { title, content };

      const response = await axios.post('http://16.16.213.101:5000/post/api/create', postData);

      if (response.status === 201) {
        toast({
          title: "Post Created",
          description: "Your new post has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while creating the post.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

    return (
        <div>
            <Navbar/>
            <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        Create Post
      </Heading>

      <VStack spacing={4} align="stretch">
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id="content">
          <FormLabel>Content</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Create Post
        </Button>
      </VStack>
            </Box>
            <Footer/>
      </div>
    
  );
};

export default CreatePost;
