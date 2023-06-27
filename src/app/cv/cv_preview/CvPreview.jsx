'use client'

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CV_DATA } from "../../../../local-json/CvResumeList";
import { getItemFromArray } from "../../../utils/appHelpers.js";
// import dynamic from "next/dynamic";

const CvPreview = () => {
 // define next userRouter Hook
  const router = useRouter();
 

  // const [resumeTemplate, setResumeTemplate] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const findItem = getItemFromArray(CV_DATA, _id);
  //   setResumeTemplate(findItem?.path || null);
  // }, [_id]);

//   const RenderComponent = dynamic(
//     () =>
//       import(`../../../../Modules/${resumeTemplate}`).catch(() => ({
//         default: () => null,
//       }))
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div className="builder-container">
    {/* {loading ? (
      <h1
        className="min-h-200 text-center flex justify-center items-center mx-auto"
      >
        loading...
      </h1>
    ) : !resumeTemplate ? (
      <h1
        className="min-h-200 text-center flex justify-center items-center"
      >
        No result is found!
      </h1>
    ) : null} */}
  
      {/* <div className="container py-5">
        <RenderComponent />
      </div> */}
    </div>
  );
};

export default CvPreview;
