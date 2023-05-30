'use client'

import Image from "next/image";
import { TextHeader, TextTitle } from "../ui/text/Text";
import OthersBtn from "../ui/buttons/OthersBtn";
import Resume from "../../../public/assets/images/hand-resume-copy-removebg-preview.png";

const Hero = () => {
  let textHeader = `Whether you're looking to switch careers.`
  let textTitle = `Say Goodbye to Stressful\n Resume Writing with\n RESUME BUILDER`
  
  return (
    <div className='flex w-full items-center h-screen justify-center mb-12 bg-fixed bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]' />
      <div className='p-5 text-white z-[2] mt-[-10rem]'>
        <div className="grid grid-cols-2 gap-4 mt-32">
            <div className="mt-52 ml-14">
              <TextHeader textHeader={textHeader} headerPosition={true}/>
              <TextTitle textTitle={textTitle} titlePosition={true} />
              <div className="mt-12">
               <OthersBtn text="Get Started" />
              </div>
            </div>
            <div className="grid justify-items-center">
               <Image className="mt-16 img-style" src={Resume} alt="resume-image" />         
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
