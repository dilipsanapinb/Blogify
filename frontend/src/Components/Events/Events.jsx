import React from "react";
import {
    Box,
    Heading,

    Image,
    SimpleGrid,
} from "@chakra-ui/react";

const eventsDataFor = [
    {
        id: 1,
        imageSrc:
            "https://www.setmytrip.in/wp-content/uploads/2023/01/png_20230114_122907_0000.png",
    },
    {
        id: 2,
        imageSrc:
            "https://m.media-amazon.com/images/I/51CaNVukgTL._AC_UF1000,1000_QL80_.jpg",
    },
    {
        id: 3,
        imageSrc:
            "https://www.asweetpeachef.com/wp-content/uploads/2014/04/SweetPeaChef_HowToFoodBlog_ver1_720x980.jpg",
    },
    {
        id: 4,
        imageSrc:
            "https://twinsmommy.com/wp-content/uploads/2020/09/personal-blogs-pin.jpg",
    },
     {
        id: 5,
        imageSrc:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJviuKb1myq6cKXcyP-z62bJ9mPjjR3bH64GQsppO3OQJsfiExG2-Jzdpoa697dm8RXU&usqp=CAU",
    },
    {
        id: 6,
        imageSrc:
            "https://m.media-amazon.com/images/I/51CaNVukgTL._AC_UF1000,1000_QL80_.jpg",
    },
    {
        id: 7,
        imageSrc:
            "https://www.asweetpeachef.com/wp-content/uploads/2014/04/SweetPeaChef_HowToFoodBlog_ver1_720x980.jpg",
    },
    {
        id: 8,
        imageSrc:
            "https://www.county.wedding/image_upload/issues/2429_lrg.jpg",
    },
    
    // Add more event data here
];
const Events = ({ currentPage, setCurrentPage }) => {
    const eventsPerPage = 4;
    const paginationEvents=eventsDataFor.slice((currentPage-1)*eventsPerPage,currentPage*eventsPerPage)
    return (
    
        <div
            style={{
                //   border: "5px solid grey",
                borderRadius: "5px",
                width: "90%",
                height: "600px",
                margin: "auto",
            }}
        >
            <Box p={4} height={{ base: "500px", md: "600px", lg: "700px" }}>
                <Heading
                    as="h1"
                    fontSize="24px"
                    textAlign="left"
                    mb={4}
                    // margin="0 auto"
                    marginBottom={"10px"}
                >
                    Types of blogs
                </Heading>
                <SimpleGrid
                    columns={4}
                    spacing={4}
                // justifyContent="space-evenly"
                >
                    {paginationEvents.map((event, index) => (
                        <Box
                            key={event.id}
                            maxW="350px"
                            maxH="440px"
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            mx={2}
                            boxShadow="lg"
                            _hover={{ boxShadow: "2xl", transform: "scale(1.05)" }}
                            transition="0.3s"
                            position="relative"
                        >
                            <Image
                                src={event.imageSrc}
                                alt={event.eventName}
                                h="100%"
                                w="100%"
                                borderRadius="5px"
                                
                                // objectFit="cover"
                            />
                            <Box p={4} textAlign="center">
                                <Heading as="h2" fontSize="18px" mb={2}>
                                    {event.eventName}
                                </Heading>
                                <Box color="gray.600" textTransform="uppercase" fontSize="14px">
                                    {event.channelName}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </div>
    );
}

export default Events