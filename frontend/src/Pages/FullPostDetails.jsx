// FullPostDetails.js
import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
const FullPostDetails = () => {
    const { id } = useParams(); // Get the "id" parameter from the URL
  const [post, setPost] = useState(null);

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
            <Button colorScheme="red" size="sm">
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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default FullPostDetails;
