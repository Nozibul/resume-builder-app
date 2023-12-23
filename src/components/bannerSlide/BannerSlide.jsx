"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const itemData = [
  {
    id: 1,
    imagePath: "assets/home_page_resume1.svg",
  },
  {
    id: 2,
    imagePath: "assets/home_page_resume2.svg",
  },
  {
    id: 3,
    imagePath: "assets/home_page_resume3.svg",
  },
];

const BannerSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = itemData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    // Autoplay interval in milliseconds
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change 4000 to the desired autoplay interval

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="w-96 carousel rounded-box overflow-hidden relative">
      {itemData?.map((item, i) => (
        <div
          key={i}
          style={{
            display: i === currentSlide ? "block" : "none",
            transition: "opacity 0.5s ease-in-out",
            opacity: i === currentSlide ? 1 : 0,
          }}
          className="carousel-item w-full"
        >
          <Image
            className="img-style"
            src={item.imagePath}
            alt={`resume-image-${item.id}`}
            priority
            width={490}
            height={570}
          />
        </div>
      ))}
    </div>
  );
};

export default BannerSlide;
