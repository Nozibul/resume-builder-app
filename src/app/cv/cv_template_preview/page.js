'use client'

import CarouselTemplate from "@/components/carouselTemplate/CarouselTemplate";
import { CV_DATA } from "../../../../local-json/CvResumeList";


const CvTemplatePreview = () => {
  return (
    <CarouselTemplate title="CV Template Preview" data={CV_DATA}/>
  );
};

export default CvTemplatePreview;







/* 'use client'

import { TextTitle } from "@/components/ui/text/Text";
import { CV_DATA, RESUME_DATA } from "../../../../local-json/CvResumeList";
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const TemplatePreview = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('_id');
 

  useEffect(() => {
    if(selectedItemId){
      const selectedItem = CV_DATA.find(item => item.id === selectedItemId);
      if (selectedItem) {
        setCarouselData([
          selectedItem,
          ...CV_DATA,
        ]);
      }
    }
  }, [selectedItemId]);


  const handleMouseScroll = (event) => {
    const delta = Math.sign(event.deltaY); // Get the direction of scroll (1 for down, -1 for up)

    let newActiveSlideIndex = activeSlideIndex + delta;

    //  last slide if scrolling beyond the first slide
    if (newActiveSlideIndex < 0) {
      newActiveSlideIndex = carouselData.length - 1;
    }
    // first slide if scrolling beyond the last slide
    else if (newActiveSlideIndex >= carouselData.length) {
      newActiveSlideIndex = 0;
    }
    setActiveSlideIndex(newActiveSlideIndex);
  };


  // Navigate to back previous screen
  const router = useRouter();
  const navigateBack = () => router.back();

  // Redirect user to cv-builder component with cv id
  const navigateToCvBuilder = () => {
    return router.push(`/cv/cv_builder?id=${carouselData[activeSlideIndex]?.id}`);
  }


  return (
    <>
      <div className="w-full">
        <div className="w-11/12 mx-auto py-12">
          <TextTitle textTitle="CV Template Preview" />
          <p className='text-slate-600 text-center my-6'>Browse through our collection of templates and select the one you prefer.</p>
        </div>
        <div className="w-6/12 h-6/12 mx-auto">
          <div className="carousel carousel-vertical rounded-box w-full h-[600px]" onWheel={handleMouseScroll}>
            {carouselData?.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item h-full w-full mx-auto ${activeSlideIndex === index ? 'selected' : ''}`}
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
            <button onClick={navigateBack} className="btn px-8 font-bold text-gray-800 bg-gradient-to-r from-pink-300 to-purple-300">Back </button>
            <button onClick={navigateToCvBuilder} className="btn px-8 font-bold text-gray-800 bg-gradient-to-r from-purple-300 to-pink-300">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;
 */