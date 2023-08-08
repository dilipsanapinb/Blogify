import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
 import { useNavigate } from "react-router-dom";
const EditPost = () => {
  const { id } = useParams();
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://13.53.131.66:5000/post/api/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        const data = await response.json();
        setPostTitle(data.post.title);
        setPostContent(data.post.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`http://13.53.131.66:5000/post/api/post/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      });
      navigate("/blogs")
      // if (response.ok) {
      //   toast({
      //     title: 'Post updated successfully!',
      //     status: 'success',
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // } else {
      //   throw new Error('Failed to update post');
      // }
    } catch (error) {
      // toast({
      //   title: 'Error updating post!',
      //   description: error.message,
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
      console.log(error);
    }
  };

  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Box p={4} bg="white" boxShadow="md" borderRadius="md" maxWidth="800px" margin="auto">
          <Heading as="h3" size="lg" mb={4}>
            Edit Post
          </Heading>
          <Input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Enter new post title"
            size="lg"
            mb={4}
          />
          <Textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Enter new post content"
            size="lg"
            resize="vertical"
            mb={4}
          />
          <Button colorScheme="blue" size="sm" onClick={handleUpdatePost}>
            Update Post
          </Button>
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default EditPost;
