// FullPostDetails.js
import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Text } from '@chakra-ui/react';
import{useNavigate}from "react-router-dom"
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
const FullPostDetails = () => {
    const { id } = useParams(); // Get the "id" parameter from the URL
  const [post, setPost] = useState(null);
  const navigate=useNavigate()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    // Fetch the post data using the post ID
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://13.53.131.66:5000/post/api/post/${id}`);
          const data = await response.json();
          const result=data.post
        setPost(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleDeleteConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://13.53.131.66:5000/post/api/post/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIsConfirmationOpen(false);
        navigate('/blogs');
        
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
  };

   
    return (
        <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Box p={4} bg="white" boxShadow="md" borderRadius="md" maxWidth="800px" margin="auto">
          <Heading as="h3" size="lg" mb={2}>
            {post?.title}
          </Heading>
          <Text fontSize="sm" color="gray.500" mb={2}>
            {post?.formattedCreatedAt}
          </Text>
          <Text>{post?.content}</Text>

          <Box mt={4}>
            <Button as={Link} to={`/edit-post/${post?.id}`} colorScheme="teal" size="sm" mr={2}>
              Edit
            </Button>
            <Button colorScheme="red" size="sm" onClick={handleDeleteConfirmation}>
              Delete
            </Button>
          </Box>

          <Box mt={4}>
            <Heading size="md" mb={2}>
              Comments
            </Heading>
            {post?.comments?.map((comment) => (
              <Box key={comment.id} p={2} bg="gray.200" borderRadius="md" marginBottom="1rem">
                <Text fontSize="sm">{comment.content}</Text>
              </Box>
            ))}
          </Box>
        </Box>
        </main>
         <AlertDialog isOpen={isConfirmationOpen} leastDestructiveRef={undefined}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={handleCancelDelete}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeletePost} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default FullPostDetails;
