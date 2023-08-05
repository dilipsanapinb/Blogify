import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Flex
                as='nav'
                alignItems={'center'}
                justifyContent={'space-between'}
                paddingY={'1rem'}
                width={'100%'}
                margin={"auto"}
                marginBottom={'10px'}
                bgColor={'blue'}
                // position={isSticky ? "sticky" : "static"}
                top="0"
                zIndex={"999"}
                borderRadius={"5px"}
            >
                {/* Left Part of Navbar */}
                <Flex className='navbar-left'>
                    <Link to="/" className='logo'>
                        <Box
                            fontSize={'3xl'}
                            fontWeight={'bold'}
                            color={'white'}
                            marginLeft={'20px'}
                        >
                            Blogify
                        </Box>
                    </Link>
                </Flex>

                {/* Middlepart of navbar */}
                {/* Right part of  Navabar */}
                
            </Flex>
        </div>
    );
}

export default Navbar