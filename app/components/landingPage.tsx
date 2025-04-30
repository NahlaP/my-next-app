
'use client'

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease",
    arrows: false,
    fade: true,
  };

  const slides = [
    { id: 1, image: "/images/banner-1.jpg", alt: "Banner 1" },
    { id: 2, image: "/images/banner-2.jpg", alt: "Banner 2" },
  ];

  return (
    <div className="w-full overflow-hidden mb-6   bg-gray-200">
    {/* // <div className="w-full overflow-hidden   pt-0 mt-0"> */}

      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
          >
   <Image
 
  src={slide.image}
  alt={slide.alt}
  fill
  priority
  sizes="100vw"
  className="object-contain bg-gray-300" // add bg-white
/>


          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
