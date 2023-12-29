import Image from "next/image"
import DocumentImage from "../../../public/assets/images/document_img.svg";
import FrameImage from "../../../public/assets/images/Frame.svg";
import DownloadImage from "../../../public/assets/images/Download.svg";
import { TextHeader, TextTitle } from "../ui/text/Text"


const Works = () => {

  return (
    <>
      <div className="w-full mt-8 mb-12">
      <TextTitle textTitle="How it's works" />
      <TextHeader textHeader="Create CV/Resume Following 3 Simple Steps" tSize="text-xl" />
        <div className="grid grid-cols-3 gap-4  justify-items-center w-full mt-12">
           <div className="grid justify-items-center border">
              <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                <div className="child-circle flex justify-center items-center">
                  <Image alt="document-image" src={DocumentImage} />
                </div>
                <div className="mini-circle flex justify-center items-center">01</div>                           
              </div>
              <div className="mt-4">
                <TextTitle textTitle="Choose a Template" />
                <TextHeader textHeader="Choose From A Number Of Exclusively Designed Templates" tSize="text-lg" />
              </div>
           </div>
          
            <div className="grid justify-items-center border">
              <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={FrameImage} />
                </div>
                <div className="mini-circle flex justify-center items-center">02</div>                           
              </div>
              <div className="mt-4">                
                <TextTitle textTitle="Enter Information" />
                <TextHeader textHeader="Simply Enter The Required Information Within Few Minutes" tSize="text-lg" />
              </div>
            </div>

            <div className="grid justify-items-center border">
              <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={DownloadImage}  />
                </div>
                <div className="mini-circle flex justify-center items-center">03</div>                           
              </div>
              <div className="mt-4">
                <TextTitle textTitle="Download" />
                <TextHeader textHeader="It’s Completely Free. Simply Login And Download Your Desired Templates" tSize="text-lg" />
              </div>
            </div>      
        </div>
      </div>
    </>
  )
}

export default Works