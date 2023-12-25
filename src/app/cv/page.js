"use client";
import TemplatesList from '@/components/lists/TemplatesList'
import { TextTitle } from '@/components/ui/text/Text'
import { useRouter } from "next/navigation";

const Cv = () => {

  // define router
  const router = useRouter();
  
  const selectCvTemplate =({id})=>{
     return router.push(`/cv/cv_template_preview?_id=${id}`)
  };

  return (
   <section className="w-full template-section">
     <div className="w-11/12 mx-auto py-12">
      <TextTitle textTitle="Select a CV Template"/>
      <p className='text-slate-600 text-center my-6'>Browse through our collection of templates and 
        select the one you prefer</p>
      <div className="py-4 render-cv-list-widget">
         <TemplatesList activeComponent={1} callBack={selectCvTemplate} />
      </div>
    </div>
   </section>
  )
}
export default Cv;
