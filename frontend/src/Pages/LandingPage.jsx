import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Carausel from '../Components/Carausel/Carousel'
import Footer from '../Components/Footer/Footer'
import { Button, Flex, Heading } from '@chakra-ui/react';
import Events from '../Components/Events/Events';
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
            "https://simpleasthatblog.com/wp-content/uploads/2016/12/photography-blog5.jpg",
    },
    {
        id: 6,

        imageSrc:
            "https://blackbeardesign.com/wp-content/uploads/2015/04/business-blog.jpg",
    },
    {
        id: 7,

        imageSrc:
            "https://qph.cf2.quoracdn.net/main-qimg-6cb1991b7c33ebca94b48869cfdc2673-lq",
    },
    {
        id: 8,
        imageSrc:
            "https://aimfit.com.au/wp-content/uploads/2018/02/Health-Fitness-Blog.jpg",
    },
    
];


const LandingPage = () => {

    const [eventsDataPage, setEventsDataPage] = useState(1);
    const eventsPerPage = 4;
    const totalPages = Math.ceil(eventsDataFor.length / eventsPerPage);

 const handleEventsDataNext = () => {
    setEventsDataPage((prevPage) =>
      Math.min(prevPage + 1, totalPages)
    );
  };

  const handleEventsDataPrev = () => {
    setEventsDataPage((prevPage) => Math.max(prevPage - 1, 1));
  };

    return (
        <div>
            <Navbar />
            <Carausel />
            <div>
        <Heading
          as="h1"
          fontSize="24px"
          textAlign="left"
          mb={4}
          marginBottom={"10px"}
        ></Heading>

        <Events
          currentPage={eventsDataPage}
          setCurrentPage={setEventsDataPage}
        />
        <Flex justify="center" mt={4}>
          <Button
            borderRadius="50%"
            onClick={handleEventsDataPrev}
            fontSize="20px"
            background="grey"
            color="white"
            visibility={eventsDataPage > 1 ? "visible" : "hidden"}
            position="absolute"
            top="60%"
            left={0}
            transform="translateY(-50%)"
            zIndex={1}
          >
            &#8249;
          </Button>
          <Button
            borderRadius="50%"
            onClick={handleEventsDataNext}
            fontSize="20px"
            background="grey"
            color="white"
            visibility={
              eventsDataPage < totalPages ? "visible" : "hidden"
            }
            position="absolute"
            top="60%"
            right={0}
            transform="translateY(-50%)"
            zIndex={1}
          >
            &#8250;
          </Button>
        </Flex>
      </div>
            <Footer/>
        </div>
    )
}

export default LandingPage