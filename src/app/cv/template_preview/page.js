'use client'

import { TextTitle } from "@/components/ui/text/Text";
import { CV_DATA } from "../../../../local-json/CvResumeList";
import { usePathname , useSearchParams } from 'next/navigation'
// import Image from 'next/image'
// import { useEffect } from 'react'


const TemplatePreview = () => {
  const pathname = usePathname()
   const searchParams = useSearchParams()
  // const router = useRouter();
  // const { _id = null} = router.query;
  // console.log(router.query)

   // navigate to back at previous screen
  //  const NavigateBack = () => router.back();

  // const [index, setIndex] = useState(0);
  // const [cvId, setCvId] = useState(null);

  // useEffect(()=>{
  //  if(_id){
  //    // find Index of given id
  //    const indexOfItem = CV_DATA.find((item)=>item.id === _id || null );
  //   //  if(indexOfItem > -1) setIndex(indexOfItem)
  //  }

  // },[_id]);


  return (
    <>
      <div>
          <div> 
            <div className="w-11/12 mx-auto py-12">
              <TextTitle textTitle="CV Template Preview"/>
              <p className='text-slate-600 text-center my-6'>Browse through our collection of templates and 
                select the one you prefer  {pathname} params: {searchParams} </p>
            </div>
          </div>
          {/* <div className="py-4">
             <div className="carousel w-full">
               {
                 CV_DATA?.map((item)=>{
                   return (
                    <div key={item.id} id="slide1" className="carousel-item relative w-full">
                    <Image src={item.imageItem} className="w-full"
                     alt="template"
                     width={600}
                     height={900} />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide4" className="btn btn-circle">❮</a> 
                      <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                  </div> 
                   )
                 })
               }
             </div>
          </div> */}
      </div>
    </>
  )
}

export default TemplatePreview