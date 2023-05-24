import Image from "next/image"
import DocumentImage from "../../../public/assets/images/document_img.svg";
import FrameImage from "../../../public/assets/images/Frame.svg";
import DownloadImage from "../../../public/assets/images/Download.svg";
import { TextHeader, TextTitle } from "../ui/text/Text"


const Works = () => {
  let textTitle = `How it's works`
  let textHeader = `Resume Writing with\n resume builder`
  
  return (
    <>
      <div className="w-full mt-12 mb-12">
        <TextTitle textTitle={textTitle} />
        <TextHeader textHeader={textHeader} />
        <div className="border outline-double outline-purple-500 outline-1  w-full grid grid-cols-3 gap-4 mt-12">
            <div className=" outline-violet-600 work-container flex justify-center items-center relative">
              <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={DocumentImage} />
              </div>
              <div className="mini-circle flex justify-center items-center">01</div>                            
            </div>

            <div className="work-container flex justify-center items-center relative">
              <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={FrameImage} />
              </div>
              <div className="mini-circle flex justify-center items-center">02</div>                          
            </div>

            <div className="work-container flex justify-center items-center relative">
              <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={DownloadImage} />
              </div>
              <div className="mini-circle flex justify-center items-center">03</div>                     
            </div>       
        </div>
      </div>
    </>
  )
}

export default Works