// FullPostDetails.js
import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const FullPostDetails = ({ post }) => {
    return (
        <Box p={4}>
            <Heading as="h3" size="lg" mb={2}>
                {post.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
                {post.formattedCreatedAt}
            </Text>
            <Text>{post.content}</Text>

            <Box mt={4}>
                <Button as={Link} to={`/edit-post/${post.id}`} colorScheme="teal" size="sm" mr={2}>
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
                {post.comments?.map((comment) => (
                    <Box key={comment.id} p={2} bg={'gray.200'} borderRadius={'md'}>
                        <Text fontSize="sm">{comment.content}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default FullPostDetails;
