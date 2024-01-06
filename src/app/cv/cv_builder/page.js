"use client"
import PersonalInfo from "@/components/modules/cv_resune_builder/personalInfo/PersonalInfo"
import { useSearchParams } from "next/navigation"
// import { CV_DATA } from "../../../../local-json/CvResumeList"
// import { CV_RESUME_MENU_LIST } from "../../../../local-json/menuListCv"
// import { AiOutlineCheck } from "react-icons/ai";


const CvBuilder = () => {
 const searchParams = useSearchParams();
 const id = searchParams.get('id')
 console.log(id);
  return (
    <div>
     <p>CV Builder -- { id }</p>
     <div>
      <PersonalInfo />
     </div>
    </div>
  )
}

export default CvBuilder;
