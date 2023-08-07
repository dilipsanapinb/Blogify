import React from 'react';
import './Carousel.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const images = [
    {
        image: "https://indiacsr.in/wp-content/uploads/2023/06/Blogging-Future-in-India.jpg",
        title: 'firstimage'
    },
    {
        image: "https://findbestcourses.com/wp-content/uploads/2022/08/Blogging.png",
        title:'secondimage'
    },
    {
        image: "https://foyr.com/learn/wp-content/uploads/2022/04/how-to-starting-an-interior-design-blog.png",
        title:'thirdimage'
    }
]
const CarouselPage = () => {
    return (
        <div className='carousel-container'
        >
            <Carousel
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                
            >
                {images.map((image, index) => (
                    <div key={index}
                        className='image-card'>
                        <img src={image.image} alt={image.title} />
                        
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default CarouselPage