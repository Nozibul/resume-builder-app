'use client'

import Image from "next/image";
import Link from "next/link"
import { TextHeader, TextTitle } from "../ui/text/Text";
import OthersBtn from "../ui/buttons/OthersBtn";
import Resume from "../../../public/assets/images/hand-resume-copy-removebg-preview.png";

const Hero = () => {
  let textHeader = `Whether you're looking to switch careers.`
  let textTitle = `Say Goodbye to Stressful\n Resume Writing with\n RESUME BUILDER`
  
  return (
    <>
     <section className='flex w-full items-center h-screen justify-center bg-fixed mb-12 bg-center bg-cover custom-img relative'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]' />
      <div className='p-5 text-white z-[2] '>
        <div className="grid grid-cols-2 gap-4">
            <div className="ml-14 mt-16">
              <TextHeader textHeader={textHeader} headerPosition={true}/>
              <TextTitle textTitle={textTitle} titlePosition={true} />
              <div className="mt-12">
               <Link href='/select-type'>
                <OthersBtn text="Get Started" />
               </Link>
              </div>
            </div>
            <div className="grid justify-items-center">
               <Image className="img-style mb-16" src={Resume} alt="resume-image" />         
            </div>
        </div>
      </div>
     </section>
    </>
  );
};

export default Hero;
