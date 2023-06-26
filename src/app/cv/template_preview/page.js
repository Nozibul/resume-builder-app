'use client'


import { TextTitle } from "@/components/ui/text/Text";
import { CV_DATA } from "../../../../local-json/CvResumeList";
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const TemplatePreview = () => {
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('id');

  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    if (selectedItemId) {
      const selectedItemIndex = CV_DATA.findIndex(item => item.id === selectedItemId);
      if (selectedItemIndex !== -1) {
        const selectedItem = CV_DATA[selectedItemIndex];
    
        setCarouselData([
          selectedItem,
          ...CV_DATA,
        ]);
      }
    } 
  }, [selectedItemId]);

  return (
    <>
      <div className="w-full">
        <div className="w-11/12 mx-auto py-12">
          <TextTitle textTitle="CV Template Preview" />
          <p className='text-slate-600 text-center my-6'>Browse through our collection of templates and select the one you prefer.</p>
        </div>
        <div className="w-6/12 h-6/12 mx-auto">
          <div className="carousel carousel-vertical rounded-box w-full h-[600px]">
            {carouselData?.map((item) => (
              <div
                key={item.id}
                className={`carousel-item h-full w-full mx-auto ${selectedItemId === item.id ? 'selected' : ''}`}
                // onClick={() => {
                //   if (selectedItemId !== item.id) {
                //     const selectedItemIndex = carouselData.findIndex(data => data.id === item.id);
                //     const selectedItem = carouselData[selectedItemIndex];
                //     const updatedCarouselData = [
                //       selectedItem,
                //       ...carouselData.slice(0, selectedItemIndex),
                //       ...carouselData.slice(selectedItemIndex + 1)
                //     ];
                //     setCarouselData(updatedCarouselData);
                //   }
                // }}
              >
                <Image
                  src={item.imageItem}
                  alt="template"
                  width={650}
                  height={650}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-5 pb-3 pb-sm-0">
            <button className="btn px-8 font-bold text-gray-800 bg-gradient-to-r from-pink-300 to-purple-300">Back</button>
            <button className="btn px-8 font-bold text-gray-800 bg-gradient-to-r from-purple-300 to-pink-300">Next</button>
            
          </div>

        </div>
      </div>
    </>
  );
};

export default TemplatePreview;


// import { TextTitle } from "@/components/ui/text/Text";
// import { CV_DATA } from "../../../../local-json/CvResumeList";
// import { useSearchParams} from 'next/navigation'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'


// const TemplatePreview = () => {

//   const searchParams = useSearchParams();
//   const _id = searchParams.get('id');


//   const [selectedItemId, setSelectedItemId] = useState(null);
//   console.log('select', selectedItemId)

//   useEffect(() => {
//     if (_id) {
//       setSelectedItemId(_id);
//     }
//   }, [_id]);
  

  // useEffect(()=>{
  //  if(_id){
  //    // store cv-id
  //   //  setCvId(searchParams);
     
  //    // find Index of given id
  //    const indexOfItem = CV_DATA?.find((item)=> item.id === _id) || null ;
  //    setIndex(indexOfItem.id)
  //  }

  // },[_id]);

   
//   return (
//     <>
//       <div>
//          <div className="w-11/12 mx-auto py-12">
//             <TextTitle textTitle="CV Template Preview"/>
//             <p className='text-slate-600 text-center my-6'>Browse through our collection of templates and 
//               select the one you prefer. </p>
//          </div>    
//          <div className="w-3/4 h-3/4 mx-auto">
//              <div className="carousel carousel-vertical  rounded-box w-3/4 h-[600px] mx-auto">
//                {
//                  CV_DATA?.map((item)=>{
//                    return (
//                     <div key={item.id} 
//                     className={`carousel-item h-full ml-44 ${
//                       selectedItemId === item.id ? 'selected' : ''
//                     }`}
                    
//                      >
//                       <Image src={item.imageItem}
//                       alt="template"
//                       width={650}
//                       height={650} />
//                     </div> 
//                    )
//                  })
//                }
//              </div>

          
//           </div> 
//       </div>
//     </>
//   )
// }

// export default TemplatePreview