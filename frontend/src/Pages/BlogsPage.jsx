import React, { useState, useEffect } from 'react';

import { Box, Heading, Text, List, ListItem, Divider, SimpleGrid, Button, VStack, Input } from '@chakra-ui/react';
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Link } from 'react-router-dom';
import { useToast } from "@chakra-ui/toast";
const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [isLoadingStates, setIsLoadingStates] = useState({});
  const toast = useToast();



  // Updated handleAddComment function


   useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://13.53.131.66:5000/post/api/posts');
        const data = await response.json();
        const result = data.AllPosts;
        // console.log(result);
        const formattedPosts = result.map((post) => ({
          ...post,
          formattedCreatedAt: formatDateTime(post.createdAt),
        }));

        setPosts(formattedPosts);
        // setPosts(result);

      } catch (error) {
        toast({
                title: "Error at fetching the data!",
                description: error.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
      }
    };

    fetchPosts();
   }, []); 
  
  
  
  // Function to format date and time (e.g., "7 August, 2023, 5:51:10 PM")
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return dateTime.toLocaleString(undefined, options);
  };

  // New function to handle input change for individual comment
  const handleCommentInputChange = (postId, commentContent) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: commentContent,
    }));
  };

  const handleAddComment = async (postId) => {
    if (isLoadingStates[postId]) return;
    setIsLoadingStates((prevStates) => ({
      ...prevStates,
      [postId]: true,
    }));
    const commentContent = commentInputs[postId];
    console.log(postId);

    try {
      const commentObj = {
        postId: postId,
        comment: commentContent,
      };
      const response = await fetch('http://13.53.131.66:5000/comment/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(commentObj),
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);

        const updatedPost = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, data], // Assuming the response contains the created comment data
            };
          }
          return post;
        });
        setPosts(updatedPost);
        setCommentInputs((prevInputs) => ({
          ...prevInputs,
          [postId]: '', // Clear the comment input after adding the comment
        }));
      } else {
        console.log('Somethin went wrong at blogpage');
      }
    } catch (error) {
      // Handle error
      console.log(error.message);
    }
    setIsLoadingStates((prevStates) => ({
      ...prevStates,
      [postId]: false, // Reset loading state after handling the comment addition
    }));
  };

  return (
    <div>
      <Navbar/>
      <div>
        <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        All Posts
      </Heading>

      {/* create post button */}
          <Box
            textAlign={'roght'}
            mb={4}
          >
            <Link
      to="/create-post"
      >
        <Button
          colorScheme='blue'
          size={'sm'}
              mb={4}
              position={'right'}
        >
          Create Post
        </Button>
      </Link>
</Box>
          {/*  */}
          {/* SimpleGrid with posts */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={6}>
        {posts.map((post) => (
          <Box key={post.id} bg="gray.100" p={4} borderRadius="md">
            <Heading as="h3" size="lg" mb={2}>
              {post.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {post.formattedCreatedAt}
            </Text>
            <Text className="truncate">{post.content}</Text>

            {/* Create a commetn */}
            <VStack
              spacing={2}
              align={'stretch'}
            >
              {post.comments?.map((comment) => (
                // individual comment
                <Box
                  key={comment.id}
                  p={2}
                  bg={'gray.200'}
                  borderRadius={'md'}
                >
                  <Text
                  fontsize='sm'
                  >
                    {comment.content}
                  </Text>
                </Box>
              ))}
            

            {/* adding a comment */}
            <Input
        placeholder='Add a comment...'
        value={commentInputs[post.id] || ''} // Use individual comment input state
        onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
        mt={4}
        size='sm'
      />
              <Button colorScheme='blue' size='sm' mt={2} onClick={() => handleAddComment(post.id)}
                isLoading={setIsLoadingStates[post.id]}>
        Add Comment
      </Button>
              </VStack>
            {/*  */}
            <Button
            s={Link} to={`/post/${post.id}`} mt={4} size="sm" colorScheme="teal"
            >
              Read More
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
      </div>
      {/* Footer */}
    <Footer/>
    </div>

    
  )
}

export default BlogsPage