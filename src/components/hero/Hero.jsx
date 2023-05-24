'use client'

import Image from "next/image";
import { TextHeader, TextTitle } from "../ui/text/Text";
import OthersBtn from "../ui/buttons/OthersBtn";

const Hero = () => {
  let textHeader = `Whether you're looking to switch careers.`
  let textTitle = `Say Goodbye to Stressful\n Resume Writing with\n RESUME BUILDER`
  return (
    <div className='flex w-full items-center h-screen justify-center mb-12 bg-fixed bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]' />
      <div className='p-5 text-white z-[2] mt-[-10rem]'>
        <div className="grid grid-cols-2 gap-4 mt-32">
            <div className="mt-52">
              <TextHeader textHeader={textHeader} />
              <TextTitle textTitle={textTitle} textPosition={true} />
              <div className="mt-12">
               <OthersBtn text="Get Started" />
              </div>
            </div>
            <div className="">
                
                {/* <p>Resume builder</p> */}
                {/* <Image className="img-fluid img-style" src={HomePageResumeImg} alt="resume-image" /> */}
    
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
