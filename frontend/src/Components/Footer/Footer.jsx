import { useEffect, useState } from "react";
import { Box, Flex, Text, Icon, VStack } from "@chakra-ui/react";
import { FaArrowUp, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div style={{ width: "100%", margin: "auto", borderRadius: '3px' }}>
            <Box as="footer" py={4} bg="gray.800" color="white" borderRadius={"5px"} height={"200px"}>
                <Flex
                    justify="center"
                    align="center"
                    px={4}
                    flexDirection={{ base: "column", md: "row" }}
                >
                    {/* Website name and contact information */}
                    <VStack spacing={2} textAlign={{ base: "center", md: "left" }}>
                        <Text fontSize="lg" fontWeight="bold">
                            Blogify
                        </Text>
                        <Flex align="center">
                            <Icon as={FaPhone} boxSize={4} mr={1} />
                            <Text>Contact India: +91 9175329907</Text>
                        </Flex>
                        <Flex align="center">
                            <Icon as={FaEnvelope} boxSize={4} mr={1} />
                            <Text>Email: dilipsanap@Blogify.com</Text>
                        </Flex>
                    </VStack>

                    {/* Scroll-to-top arrow */}
                    {showScrollToTop && (
                        <Box
                            position="fixed"
                            bottom="20px"
                            right="20px"
                            zIndex="999"
                            cursor="pointer"
                            onClick={handleScrollToTop}
                            bg="teal.500"
                            color="white"
                            borderRadius="50%"
                            p={3}
                            boxShadow="lg"
                        >
                            <Icon as={FaArrowUp} boxSize="8" />
                        </Box>
                    )}
                </Flex>
            </Box>
        </div>
    );
};

export default Footer;
