import Image from "next/image"
import DocumentImage from "../../../public/assets/images/document_img.svg";
import FrameImage from "../../../public/assets/images/Frame.svg";
import DownloadImage from "../../../public/assets/images/Download.svg";
import { TextHeader, TextTitle } from "../ui/text/Text"


const Works = () => {
  let textTitle = `How it's works`
  let textHeader = `Resume Writing with\n resume builder`
  let workHeader = `Aliquam erat volutpat. Integer malesuada turpis fringilla suscipit. `
  
  return (
    <>
      <div className="w-full mt-8 mb-12">
      <TextTitle textTitle={textTitle} />
      <TextHeader textHeader={textHeader} tSize="text-xl" />
        <div className="grid grid-cols-3 gap-4  justify-items-center w-full mt-12">
           <div className="grid justify-items-center">
              <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                <div className="child-circle flex justify-center items-center">
                  <Image alt="document-image" src={DocumentImage} />
                </div>
                <div className="mini-circle flex justify-center items-center">01</div>                           
              </div>
              <div>
                <TextTitle textTitle="Choose a Template" t_size="text-2xl" />
                <TextHeader textHeader={workHeader} tSize="text-xl" />
              </div>
           </div>
          
            <div className="grid justify-items-center">
              <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={FrameImage} />
                </div>
                <div className="mini-circle flex justify-center items-center">02</div>                           
              </div>
              <div>                
                <TextTitle textTitle="Enter Information" t_size="text-2xl" />
                <TextHeader textHeader={workHeader} tSize="text-xl" />
              </div>
            </div>

            <div className="grid justify-items-center">
              <div className=" outline-violet-600 work-container flex justify-center items-center relative">
                <div className="child-circle flex justify-center items-center">
                <Image alt="document-image" src={DownloadImage} width={50} height={50} />
                </div>
                <div className="mini-circle flex justify-center items-center">03</div>                           
              </div>
              <div>
                <TextTitle textTitle="Download" t_size="text-2xl" />
                <TextHeader textHeader={workHeader} tSize="text-xl" />
              </div>
            </div>      
        </div>
      </div>
    </>
  )
}

export default Works