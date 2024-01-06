"use client"
import PersonalInfo from "@/components/modules/cv_resune_builder/personalInfo/PersonalInfo"
import { useSearchParams } from "next/navigation"

const CvBuilder = () => {
 const searchParams = useSearchParams()
// console.log('params',searchParams)

  return (
    <div>Cv Builder -- { searchParams } 
     <div>
      <PersonalInfo />
     </div>
    </div>
  )
}

export default CvBuilder;
