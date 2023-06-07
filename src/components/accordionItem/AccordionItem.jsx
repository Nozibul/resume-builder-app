import { accordion_data } from '../../../local-json/accordion'
import { TextTitle } from '../ui/text/Text'

const AccordionItem = () => {
    const titleText = `Have Questions For A Great Resume?`
  return (
    <>
     <div className='bg-base-200 w-full py-12 mt-14'>
        <div>
          <TextTitle textTitle={titleText}  />
          <p className='text-slate-600 text-center my-6'>Expert Answers to All Your Resume Inquiries.</p>
        </div>
        {accordion_data?.length === 0 ? "Loading..." : (
         <>
            {accordion_data.map((item) => (
            <div key={item.id} className="collapse collapse-plus bg-white w-10/12 mx-auto my-4 p-3">
                <input type="radio" name="my-accordion-3"  /> 
                <div className="collapse-title text-xl font-medium">
                {item.heading}
                </div>
                <div className="collapse-content"> 
                <p>{item.description}</p>
                </div>
            </div>
            ))}
         </>
        )}


     </div>
    
    </>
  )
}

export default AccordionItem