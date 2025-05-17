
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import Image from 'next/image';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface Banner {
//   _id: string;
//   imageUrl: string;
//   alt: string;
// }

// const Hero = () => {
//   const [banners, setBanners] = useState<Banner[]>([]);

//   useEffect(() => {
//     const fetchBanners = async () => {
//       const res = await fetch('http://localhost:5000/api/banners');
//       const data = await res.json();
//       setBanners(data);
//     };

//     fetchBanners();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: "ease",
//     arrows: false,
//     fade: true,
//   };

//   return (
//     <div className="w-full overflow-hidden mb-6 bg-gray-200">
//       <Slider {...settings}>
//         {banners.map((slide) => (
//           <div
//             key={slide._id}
//             className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
//           >
//             <Image
//               src={slide.imageUrl}
//               alt={slide.alt}
//               fill
//               priority
//               sizes="100vw"
//               className="object-contain bg-gray-300"
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Hero;




'use client';

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Banner {
  _id: string;
  imageUrl: string;
  alt: string;
}

const Hero = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banners`);
        if (!res.ok) {
          throw new Error('Failed to fetch banners');
        }
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

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

  return (
    <div className="w-full overflow-hidden mb-6 bg-gray-200">
      <Slider {...settings}>
        {banners.map((slide) => (
          <div
            key={slide._id}
            className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
          >
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              className="object-contain bg-gray-300"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
