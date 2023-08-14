"use client";

import { TextTitle } from "@/components/ui/text/Text";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

const CarouselTemplate = ({ title, data }) => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get("_id");

  useEffect(() => {
    if (selectedItemId) {
      const selectedItem = data.find((item) => item.id === selectedItemId);
      if (selectedItem) {
        setCarouselData([selectedItem, ...data]);
        setActiveSlideIndex(0);
      }
    }
  }, [selectedItemId, data]);


  // Mouse Scroll Handler
  const handleMouseScrollCarousel = (event) => {
    if (scrolling) return; // Ignore scroll events when scrolling is already in progress
    setScrolling(true);

    const delta = Math.sign(event.deltaY); // Get the direction of scroll (1 for down, -1 for up)

    let newActiveSlideIndex = activeSlideIndex + delta;

    // Wrap around to the last slide if scrolling beyond the first slide
    if (newActiveSlideIndex < 0) {
      newActiveSlideIndex = carouselData.length - 1;
    }
    // Wrap around to the first slide if scrolling beyond the last slide
    else if (newActiveSlideIndex >= carouselData.length) {
      newActiveSlideIndex = 0;
    }
    setActiveSlideIndex(newActiveSlideIndex);

    setTimeout(() => {
      setScrolling(false); // Reset the scrolling flag after a short delay
    }, 1000); // Adjust the delay as needed
  };


  // Navigate to back previous screen
  const router = useRouter();
  const navigateBack = () => router.back();

  // Redirect user to cv-builder component with cv id
  const navigateToCvBuilder = () => {
    const matchNavigate = carouselData[activeSlideIndex]?.id.match(/[c]/gi);

    return router.push(
      matchNavigate && matchNavigate[0].toLowerCase() === "c"
        ? `/cv/cv_builder?id=${carouselData[activeSlideIndex]?.id}`
        : `/resume/resume_builder?id=${carouselData[activeSlideIndex]?.id}`
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="w-11/12 mx-auto py-12">
          <TextTitle textTitle={title} />
          <p className="text-slate-600 text-center my-6">
            Browse through our collection of templates and select the one you
            prefer.
          </p>
        </div>
        <div className="w-6/12 h-6/12 mx-auto">
          <div
            className="carousel carousel-vertical rounded-box w-full h-[600px]"
            onWheel={handleMouseScrollCarousel}
          >
            {carouselData?.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item h-full w-full mx-auto ${
                  activeSlideIndex === index ? "selected" : ""
                }`}
              >
                <Image
                  src={item.imageItem}
                  alt="template"
                  width={650}
                  height={650}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-5 pb-3 pb-sm-0">
            <button
              onClick={navigateBack}
              className="btn px-8 font-bold text-gray-800 bg-gradient-to-r from-pink-300 to-purple-300"
            >
              Back
            </button>
            <button
              onClick={navigateToCvBuilder}
              className="btn px-8 font-bold text-gray-800 bg-gradient-to-r from-purple-300 to-pink-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselTemplate;
