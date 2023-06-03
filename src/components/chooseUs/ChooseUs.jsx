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
         <div className="flex items-center py-3">
            <div className="img-styles mx-4">
                <Image src={HandImage} alt="hand-image" />
            </div>
            <div>
             <p className="text-xl mb-2">Easy Online Resume Builder</p>
              <p>
                Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit
                maecenas ultrices.
              </p>
            </div>
         </div> 
        </div>

        <div className="box-2 mb-4">
            <div className="flex items-center py-3">
                <div className="img-styles mx-4 ">
                    <Image src={EditImage} alt="hand-image" />
                </div>
                <div>
                    <p className="text-xl mb-2">Create Job Winning Resumes</p>
                    <p>
                        Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit
                        maecenas ultrices.
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
                    <p className="text-xl mb-2">Export to Anything</p>
                    <p>
                        Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit
                        maecenas ultrices.
                    </p>
                </div>
            </div> 
        </div>
     
      </div>

      <div className='p-4'>
        <TextTitle textTitle="Why choose us" titlePosition={true} />
        <div className='mt-8'>
            <p className='text-neutral-500'>
              We’re certainly not the only content marketing company out there,
              but we strive to be the best. One of our core principles is to 
              only sell a quality of service that is proven and that we 
              believe in, even if it means missing out on a few customers.
            </p>
        </div>
        <div className='my-10'>
            <p className='text-neutral-500'>
              We’re the only known company that offers a fully-managed blog 
              content service with an uncompromising level of quality and 
              decades of experience, without the expensive agency price tag.
            </p>
        </div>
          <OthersBtn text="create my resume/cv" />
      </div>
     </div>
    </>
  )
}

export default ChooseUs