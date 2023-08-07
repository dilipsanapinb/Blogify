import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
 import { useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
const token = localStorage.getItem('userInfo');

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
    const toast = useToast();
   const navigate=useNavigate()
    // console.log(token);
    const handleSubmit = async () => {
  try {
    // if (!token) {
    //   // Handle authentication error (user not logged in)
    //   toast({
    //     title: "Authentication Required",
    //     description: "You need to log in to create a post.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top",
    //   });
    //   return;
    // }

    const postData = { title, content };
    const response = await fetch('http://13.53.131.66:5000/post/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      toast({
        title: "Post Created",
        description: "Your new post has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
        navigate('/blogs')
    } else {
      throw new Error('Failed to create post');
    }
  } catch (error) {
    console.error(error);
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
