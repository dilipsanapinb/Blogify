import {
    Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, InputGroup, InputRightElement,
    useDisclosure,
    Link as ChakraLink,
    Button
} from '@chakra-ui/react';
import "./Navbar.css"
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSearch } from "react-icons/bi"
import { HamburgerIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/toast";
const Navbar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState();
    const toast = useToast();
    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsSticky(scrollPosition > 0)
    }
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearch = async() => {
        try {
    const response = await fetch(`http://13.53.131.66:5000/post/api/searchposts/${searchInput}`);
    const data = await response.json();
    const result = data.AllPosts;
    const formattedPosts = result.map((post) => ({
      ...post,
      formattedCreatedAt: formatDateTime(post.createdAt),
    }));
    setPosts(formattedPosts);
  } catch (error) {
    toast({
      title: "Error at searching posts!",
      description: error.response?.data?.message || "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
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
    return (
            <Flex
                as='nav'
                alignItems={'center'}
                justifyContent={'space-between'}
                paddingY={'1rem'}
                width={'100%'}
                margin={"auto"}
                marginBottom={'10px'}
                bgColor={'orange'}
                position={isSticky ? "sticky" : "static"}
                top="0"
                zIndex={"999"}
                // borderRadius={"5px"}
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
                <Flex className='navbar-middle'
                    alignItems={'center'}
                    width={'70%'}
                    
                >
                    <InputGroup maxW={'600px'} mar="2rem">
                        <Input
                            type="text"
                            placeholder='Search post by title'
                            borderRadius={'4px'}
                            bg={'white'}
                        size="md"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        ></Input>
                        <InputRightElement pointerEvents="none">
            <BiSearch color="gray.500" onClick={handleSearch} style={{ cursor: "pointer" }} />
          </InputRightElement>
                    </InputGroup>
                </Flex>


                {/* Right part of  Navabar */}
                <Flex className='navbar-right'>
                    <IconButton
                        as={'button'}
                        className='hamburger'
                        icon={<HamburgerIcon />}
                        variant={'unstyled'}
                        fontSize={'1.5rem'}
                        marginRight={'10px'}
                        backgroundColor={''}
                        color={'white'}
                        onClick={onOpen}
                    />
                        <Drawer
                            placement='right'
                            onClose={onClose}
                            isOpen={isOpen}
                        >
                            <DrawerOverlay/>
                                <DrawerContent>
                                    <DrawerCloseButton/>
                                        <DrawerHeader>
                                            Menu
                                        </DrawerHeader>
                                        <DrawerBody>
                                            <ChakraLink
                                                as={Link}
                                                to='/signin'
                                                className='dropdown-button'
                                                display={'block'}
                                                mb='0.5rem'
                                            >
                                                <Button
                                                    className='dropdown-button'
                                                    display={'block'}
                                                    mb={'0.5rem'}
                                                >
                                                    SignIn
                                                </Button>
                                                
                                            </ChakraLink>
                                            <Button
                                                    className='dropdown-button'
                                                    display={'block'}
                                                    mb={'0.5rem'}
                                                >
                                                    Logout
                                            </Button>
                                            <Button
                                                    className='dropdown-button'
                                                    display={'block'}
                                                    mb={'0.5rem'}
                                                >
                                                    More
                                                </Button>
                                        </DrawerBody>
                                </DrawerContent>

                        </Drawer>
                    
                </Flex>
                
            </Flex>
    );
}

export default Navbar