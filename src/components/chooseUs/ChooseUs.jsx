import Image from 'next/image'
import OthersBtn from '../ui/buttons/OthersBtn'
import { TextTitle } from '../ui/text/Text'
import HandImage from "../../../public/assets/images/hand.png";
import ExportImage from "../../../public/assets/images/export.png";
import EditImage from "../../../public/assets/images/edit.png";

const ChooseUs = () => {
  return (
    <>
     <div className='grid grid-cols-2 gap-4 w-11/12 p-6 mt-12'>
      <div className='mt-6'>
       <div className="box-1 mb-4">
         <div className="flex items-center py-6">
            <div className="img-styles mx-4">
                <Image src={HandImage} alt="hand-image" />
            </div>
            <div>
             <p className="text-xl font-semibold mb-2">Easy Online Resume Builder</p>
              <p>
              Build Your Resume/CV In Simple Few Steps
              </p>
            </div>
         </div> 
        </div>

        <div className="box-2 mb-4">
            <div className="flex items-center py-6">
                <div className="img-styles mx-4 ">
                    <Image src={EditImage} alt="hand-image" />
                </div>
                <div>
                    <p className="text-xl font-semibold mb-2">Auto-Save Progress</p>
                    <p>
                    Start From Where You Previously Left
                    </p>
                </div>
            </div> 
        </div>

        <div className=" box-3">
            <div className="flex items-center py-3">
                <div className="img-styles mx-4 ">
                    <Image src={ExportImage} alt="hand-image" />
                </div>
                <div>
                    <p className="text-xl font-semibold mb-2">Export to Anything</p>
                    <p>
                    No Limitation In Exporting Your Desired Premium Resume/CV Templates For Free!
                    </p>
                </div>
            </div> 
        </div>
     
      </div>

      <div className='p-4'>
        <TextTitle textTitle="Why choose us" titlePosition={true} />
        <div className='mt-8'>
            <p className='text-neutral-500'>
            Choose our Resume Builders for a seamless resume-building experience. Enjoy the freedom to export unlimited templates for free, giving you endless options to showcase your skills. With our autosave feature, your progress is securely saved, allowing you to pick up where you left off. Our user-friendly interface makes creating professional resumes a breeze, even without design skills.
            </p>
        </div>
        <div className='my-8'>
            <p className='text-neutral-500 '>
            Don't miss out on your dream job – join us today and effortlessly create standout resumes.
            </p>
        </div>
          <OthersBtn text="create my resume/cv" />
      </div>
     </div>
    </>
  )
}

export default ChooseUs